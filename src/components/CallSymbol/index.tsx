import { CloseOutlined, InboundOutlined, OutboundOutlined, VoicemailOutlined } from '@aircall/tractor';
import { Call } from '../../types';

export const CallSymbol = ({ call_type, direction }: Call) =>

  call_type === 'missed'
    ? <CloseOutlined /> : 
  call_type === 'voicemail'
    ? <VoicemailOutlined /> :
  direction === 'inbound'
    ? <InboundOutlined width="28" height="28" /> : 
      <OutboundOutlined width="28" height="28" />