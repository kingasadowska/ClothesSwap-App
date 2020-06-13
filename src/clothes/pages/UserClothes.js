import React, { useEffect, useState } from 'react';
import ClothesList from '../components/ClothesList';
import { useParams } from 'react-router-dom';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Spinner from '../../shared/components/UIElements/Spinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const UserClothes = () => {
    const [loadedClothes, setLoadedClothes] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const userId = useParams().userId;

    useEffect(() => {
        const fetchClothes = async () => {
          try {
            const responseData = await sendRequest(
              `http://localhost:5000/api/clothes/user/${userId}`
            );
            setLoadedClothes(responseData.clothes);
          } catch (err) {}
        };
        fetchClothes();
      }, [sendRequest, userId]);

      const deletedClothesHandler = deletedClothesId => {
        setLoadedClothes(prevClothes =>
          prevClothes.filter(clothes => clothes.id !== deletedClothesId)
        );
      };

    return (
        <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
            <div className="center">
            <Spinner />
            </div>
        )}
        {!isLoading && loadedClothes && 
        (<ClothesList items={loadedClothes} onDeletePlace={deletedClothesHandler}/>)}
        </React.Fragment>
  );
};

export default UserClothes;