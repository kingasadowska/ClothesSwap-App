import React, { useState, useContext } from 'react';
import Card from '../../shared/components/UIElements/Card'; 
import Button from '../../shared/components/Buttons/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Spinner from '../../shared/components/UIElements/Spinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './ClothesItem.css';

const ClothesItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [openMap, setOpenMap] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const openMapHandler = () => setOpenMap(true);

  const closeMapHandler = () => setOpenMap(false);

  const showDeleteWarningHandler = () => {
    setOpenConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setOpenConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setOpenConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/clothes/${props.id}`,
        'DELETE',
        null, 
        {
          Authorization: 'Bearer ' + auth.token
        }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };
  
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal 
        open={openMap} 
        onClose={closeMapHandler} 
        header={props.address}
        contentClass="clothes-item_modal-content"
        footerClass="clothes-item_modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
        <Map center={props.coordinates} zoom={17} />
        </div>
      </Modal>
      <Modal
          show={openConfirmModal}
          onCancel={cancelDeleteHandler}
          header="Are you sure to delete this item??"
          footerClass="clothes-item_modal-actions"
          footer={
            <>
              <Button primary onClick={cancelDeleteHandler}>
                CANCEL
              </Button>
              <Button delete onClick={confirmDeleteHandler}>
                DELETE
              </Button>
            </>
          }
        >
          <p>
            Do you want to proceed and delete this clothes?
          </p>
        </Modal>
      <li className="clothes-item">
        <Card className="clothes-item_content">
        {isLoading && <Spinner asOverlay />}
          <div className="clothes-item_image">
              <img src={`http://localhost:5000/${props.image}`} alt={props.title} />
          </div>
          <div className="clothes-item_about">
              <h2>{props.title}</h2>
              <h2>{props.size}</h2>
              <p>{props.price}</p>
              <p>{props.description}</p>
              <h2>{props.address}</h2>
          </div>
          <div className="clothes-item_actions">
              <Button primary onClick={openMapHandler}>PICK UP</Button>
              {auth.userId === props.creatorId && (
                <Button to={`/clothes/${props.id}`}>EDIT</Button>
              )}
              {auth.userId === props.creatorId && (
                <Button delete onClick={showDeleteWarningHandler}>DELETE</Button>
              )}
          </div>
        </Card>
      </li>
    </>
 );
};

export default ClothesItem;