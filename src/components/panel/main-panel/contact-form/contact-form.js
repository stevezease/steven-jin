import React, { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import './contact-form.scss';

const ContactForm = ({ modalIsOpen, setModalIsOpen }) => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const email = '';
  const message = '';
  const closeModal = () => setModalIsOpen(false);
  const customStyles = {};
  let form = null;
  const reset = forceKeep => {
    console.log(status === 'SUCCESS', form, !forceKeep);
    if (status === 'SUCCESS' && form && !forceKeep) {
      form.reset();
      console.log('RESET!!');
    }
    setLoading(false);
    setStatus('');
    setSubmitted(false);
  };
  const submitForm = ev => {
    setLoading(true);
    setSubmitted(true);
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        setStatus('SUCCESS');
        setLoading(false);
      } else {
        setStatus('ERROR');
        setLoading(false);
      }
    };
    xhr.send(data);
  };
  const success = status === 'SUCCESS';
  const error = status === 'ERROR';
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className="contact-modal"
      contentLabel="Example Modal"
    >
      <div className="contact-modal-contents">
        <div className="close-button" onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />{' '}
        </div>
        <form
          onSubmit={submitForm}
          action="https://formspree.io/mdqlppzx"
          method="POST"
          className="contact-form"
          ref={el => {
            form = el;
          }}
        >
          <div
            className={submitted && 'hidden'}
            style={{ marginBottom: '10px', fontSize: '18px' }}
          >
            Send Me a Message!
          </div>
          <label className={submitted && 'hidden'}>Email:</label>
          <input
            className={submitted && 'hidden'}
            type="email"
            name="email"
            required
          />
          <label className={submitted && 'hidden'}>Message:</label>
          <textarea
            className={submitted && 'hidden'}
            rows="8"
            cols="50"
            name="message"
            required
          />

          <button
            className={`submit-button ${!submitted && 'reg'} ${loading &&
              'loading'} ${success && 'success'} ${error && 'error'}`}
            type="submit"
          >
            {!submitted && 'Submit'}
            {success && <FontAwesomeIcon icon={faCheck} />}
            {error && <FontAwesomeIcon icon={faTimes} />}
          </button>
          <div className={submitted && 'hidden'}>
            For more direct correspondence please email: StevenJinYi@Gmail.com
          </div>
        </form>
        {(success || error) && (
          <div className="result-container">
            {success && (
              <div>
                <div className="title">Your Message Was Sent!</div>
                <div>I will get back to you promptly</div>
              </div>
            )}
            {error && (
              <div>
                <div className="title">Oops! Something Went Wrong</div>
                <div>If problem persists please email:</div>
                <div>StevenJinYi@gmail.com</div>
              </div>
            )}
            {
              <div className="again-button-container">
                {success && (
                  <div className="again-button" onClick={() => reset(true)}>
                    View Your Message
                  </div>
                )}
                <div className="again-button" onClick={() => reset(false)}>
                  {success && 'Send Another?'} {error && 'Try Again?'}
                </div>
              </div>
            }
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ContactForm;
