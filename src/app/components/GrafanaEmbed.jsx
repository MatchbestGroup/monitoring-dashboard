const GrafanaEmbed = ({ url }) => {
  return (
    <iframe
      src={url}
      width="100%"
      height="600px"
      frameBorder="0"
      title="Grafana Dashboard"
    ></iframe>
  );
};

export default GrafanaEmbed;
