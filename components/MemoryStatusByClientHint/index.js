
import { CLIENT_HINT_MEMORY_LIMIT } from '../../config';

const MemoryStatusByClientHint = ({ clientHintDeviceMemory }) => (
  <>
    <h4 className='annotation'>{`[Client Hint Device Memory from Server Side Rendering: ${clientHintDeviceMemory} GByte]`}</h4>
    <h4 className='annotation'>{`[Client Hint Device Memory Limit for Animation: ${CLIENT_HINT_MEMORY_LIMIT} GByte]`}</h4>
    <h4 className='annotation'>{`[Device Memory Overloaded: ${clientHintDeviceMemory < CLIENT_HINT_MEMORY_LIMIT ? 'Yes' : 'No'}]`}</h4>
    <style jsx>{`
      .annotation {
        margin: 0;
        margin-bottom: 8px;
      }
    `}</style>
  </>
);

export default MemoryStatusByClientHint;
