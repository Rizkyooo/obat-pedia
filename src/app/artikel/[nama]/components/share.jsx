'use client'
import { TwitterShareButton, FacebookShareButton, WhatsappShareButton,  } from 'react-share';
import { TwitterIcon, FacebookIcon, WhatsappIcon } from 'react-share';

const ShareComponent = ({url, title}) => {
  // Replace with your desired title

  return (
    <div className="flex gap-4 justify-center items-center animate-bounce">
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={24} round />
      </TwitterShareButton>
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={24} round />
      </FacebookShareButton>
      <WhatsappShareButton url={url} title={title}>
        <WhatsappIcon size={24} round />
      </WhatsappShareButton>
    </div>
  );
}

export default ShareComponent;