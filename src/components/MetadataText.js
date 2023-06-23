import Highlighter from 'react-highlight-words';

const MetadataText = ({ data, limitLines, searchTerm, label, ...rest }) => {
  if (!data || data === '') {
    return null;
  }

  return (
    <div {...rest}>
      <h4 className='mb-2 text-md text-gray-400'>{label}</h4>
      <p className={limitLines && 'line-clamp-5 text-gray-100'}>
        <Highlighter
          highlightTag='span'
          highlightClassName='font-black text-white'
          searchWords={[searchTerm]}
          textToHighlight={data}
        />
      </p>
    </div>
  );
};

export default MetadataText;