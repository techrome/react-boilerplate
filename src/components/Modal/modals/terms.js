import React from 'react';
import { connect } from 'react-redux';

import Modal from './_base';

const TermsModal = ({ onClose, onConfirm, ...props }) => {
  return (
    <Modal
      onClose={onClose}
      title="Terms and conditions"
      onConfirm={() => {
        onConfirm();
        onClose();
      }}
      confirmText="I agree"
    >
      Lorem ipsum
    </Modal>
  );
};

const mapState = (state) => ({});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(TermsModal);
