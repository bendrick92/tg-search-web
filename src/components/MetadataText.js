import Highlighter from 'react-highlight-words';

const MetadataText = ({ data, limitLines, searchTerm, label, ...rest }) => {
  if (!data || data === '') {
    return null;
  }

  return (
    <div {...rest}>
      <h4 className='mb-1.5 text-md text-gray-400'>{label}</h4>
      <p className={limitLines && 'line-clamp-5 text-gray-200'}>
        <Highlighter
          highlightTag='span'
          highlightClassName='font-black text-teal-500'
          searchWords={[searchTerm]}
          textToHighlight={data}
        />
      </p>
    </div>
  );
};

export default MetadataText;