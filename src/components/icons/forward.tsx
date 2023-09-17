import * as React from 'react';

function ForwardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <path d="M6 18L14.5 12L6 6V18ZM16 6V18H18V6H16Z" />
    </svg>
  );
}

export default ForwardIcon;
