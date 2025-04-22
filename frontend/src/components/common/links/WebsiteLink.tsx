interface WebsiteLinkProps {
  url: string;
}

const WebsiteLink = ({ url }: WebsiteLinkProps) => {
  const formattedUrl = url.startsWith("http") ? url : `https://${url}`;

  const displayUrl = url.replace(/^https?:\/\//, "");

  return (
    <a
      href={formattedUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center text-p500 hover:text-p600 hover:underline"
    >
      {displayUrl}
    </a>
  );
};

export default WebsiteLink;
