import React from 'react';
import PropTypes from 'prop-types';
import {FaClipboard} from 'react-icons/lib/fa';
import CopyToClipboard from 'react-copy-to-clipboard';
import Button from '../../components/Button/Button';

const EventSettingCopyClipboard = props => (
  <CopyToClipboard
    text={window.location.href}
    onCopy={props.onSuccess}
  >
    <Button icon={<FaClipboard color="white" size={16} />}>
      Copy URL
    </Button>
  </CopyToClipboard>
);

EventSettingCopyClipboard.propTypes = {
  onSuccess: PropTypes.func.isRequired
};

export default EventSettingCopyClipboard;