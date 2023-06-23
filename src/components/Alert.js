import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleExclamation, faCircleInfo, faTimes} from '@fortawesome/free-solid-svg-icons';

const Alert = ({ type, message, show, dismiss }) => {
  const color = type === 'error' ? 'bg-red-500' : 'warning' ? 'bg-yellow-500' : 'bg-blue-500';
  const icon = type === 'error' ? faCircleExclamation : 'warning' ? faCircleExclamation : faCircleInfo;

  return (
    <div className={`fixed -top-16 inset-x-0 opacity-0 z-100 transition ease-in-out duration-500 ${show && 'translate-y-28 opacity-100'}`}>
      <div className='max-w-sm mx-auto px-4'>
        <div className={`px-4 py-3 text-center ${color} rounded-lg flex flex-row items-center cursor-pointer`} onClick={() => dismiss()}>
          <div className='grow flex flex-row items-center justify-center'>
            <FontAwesomeIcon icon={icon} size='sm' className='p-0.5 mr-2 text-red-500 bg-white rounded-full'/>
            {message}
          </div>
          <FontAwesomeIcon icon={faTimes} size='sm'/>
        </div>
      </div>
    </div>
  )
};

export default Alert;