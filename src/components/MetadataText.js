const MetadataText = ({ data, limitLines, label, ...rest }) => {
  if (!data || data === '') {
    return null;
  }

  return (
    <div {...rest}>
      <h4 className='mb-2 text-md text-gray-400'>{label}</h4>
      <p className={limitLines && 'line-clamp-5'}>
        {data}
      </p>
    </div>
  );
};

export default MetadataText;