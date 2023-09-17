import { XMLParser } from 'fast-xml-parser';
import sanitizeHtml from 'sanitize-html';

function parseDuration(duration: string | null): string | null {
  if (!duration) return null;

  if (!isNaN(Number(duration))) {
    return Math.floor(Number(duration) / 60) + ' mins';
  }

  let match = duration.match(/(\d?\d):(\d\d):(\d\d)/);

  if (match) {
    const hours = Number(match[1]);
    const minutes = Math.floor(Number(match[2]));
    if (hours === 0) {
      return `${minutes} mins`;
    }
    return `${hours}h ${minutes}m`;
  }

  match = duration.match(/(\d?\d):(\d\d)/);

  if (match) {
    const minutes = Math.floor(Number(match[1]));
    return `${minutes} mins`;
  }

  return duration;
}

export default async function parsePodcast(data: string) {
  const xml = new XMLParser({
    attributeNamePrefix: '',
    textNodeName: '$text',
    ignoreAttributes: false,
  });

  const result = xml.parse(data);

  let channel = result.rss && result.rss.channel ? result.rss.channel : result.feed;
  if (Array.isArray(channel)) channel = channel[0];

  const rss = {
    title: channel.title ?? '',
    description: channel.description ?? '',
    link: channel.link && channel.link.href ? channel.link.href : channel.link,
    image: channel.image
      ? channel.image.url
      : channel['itunes:image']
        ? channel['itunes:image'].href
        : '',
    category: channel.category || [],
    items: [] as Array<Record<string, any>>,
  };

  let items = channel.item || channel.entry || [];
  if (items && !Array.isArray(items)) items = [items];

  for (let i = 0; i < items.length; i++) {
    const val = items[i];
    const media = {};

    const obj: Record<string, any> = {
      id: val.guid && val.guid.$text ? val.guid.$text : val.id ? val.id : `item-${i}`,
      title: val.title && val.title.$text ? val.title.$text : val.title,
      description: sanitizeHtml(
        val.summary && val.summary.$text ? val.summary.$text : val.description,
      ),
      link: val.link && val.link.href ? val.link.href : val.link,
      author: val.author && val.author.name ? val.author.name : val['dc:creator'],
      published: val.created
        ? Date.parse(val.created)
        : val.pubDate
          ? Date.parse(val.pubDate)
          : Date.now(),
      created: val.updated
        ? Date.parse(val.updated)
        : val.pubDate
          ? Date.parse(val.pubDate)
          : val.created
            ? Date.parse(val.created)
            : Date.now(),
      category: val.category || [],
      content: val.content && val.content.$text ? val.content.$text : val['content:encoded'],
      enclosures: val.enclosure
        ? Array.isArray(val.enclosure)
          ? val.enclosure
          : [val.enclosure]
        : [],
    };

    [
      'content:encoded',
      'podcast:transcript',
      'itunes:summary',
      'itunes:author',
      'itunes:explicit',
      'itunes:duration',
      'itunes:season',
      'itunes:episode',
      'itunes:episodeType',
      'itunes:image',
    ].forEach((s) => {
      if (val[s]) obj[s.replace(':', '_')] = val[s];
    });

    if (val['media:thumbnail']) {
      Object.assign(media, { thumbnail: val['media:thumbnail'] });
      obj.enclosures.push(val['media:thumbnail']);
    }

    if (val['media:content']) {
      Object.assign(media, { thumbnail: val['media:content'] });
      obj.enclosures.push(val['media:content']);
    }

    if (val['media:group']) {
      if (val['media:group']['media:title']) obj.title = val['media:group']['media:title'];

      if (val['media:group']['media:description'])
        obj.description = val['media:group']['media:description'];

      if (val['media:group']['media:thumbnail'])
        obj.enclosures.push(val['media:group']['media:thumbnail'].url);

      if (val['media:group']['media:content'])
        obj.enclosures.push(val['media:group']['media:content']);
    }

    if (obj['itunes_duration']) {
      obj.itunes_duration = parseDuration(obj.itunes_duration);
    }

    Object.assign(obj, { media });

    rss.items.push(obj);
  }

  return rss;
}