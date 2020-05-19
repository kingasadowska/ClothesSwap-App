import React from 'react';
import ClothesList from '../components/ClothesList';
import { useParams } from 'react-router-dom';

const DUMMY_CLOTHES = [
 {
    id: 'p1',
    title: 'Dress',
    description: 'short yellow',
    imageUrl: 'https://content.asos-media.com/-/media/homepages/ww/2020/05/11/ww_global_mobile-hero_1650-x-1884_4th-may.jpg',
    size: 'S',
    price: '15 $',
    location: {
        lat: 40.7484405,
        lng: -73.9878584
      },
    creator: 'u1'
 },
 {
    id: 'p2',
    title: 'Dress',
    description: 'long green',
    imageUrl: 'https://www.pronovias.com/media/wysiwyg/2021/05/Homepage/the-party-edit-ss2020-pronovias-m_2x.jpg',
    size: 'S',
    price: '40 $',
    location: {
        lat: 40.7484405,
        lng: -73.9878584
    },
    creator: 'u2'
 },
 {
    id: 'p3',
    title: 'Dress',
    description: 'mid red',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0074/5124/6676/products/053203826649-60-0.jpg?v=1587421343',
    size: 'S',
    price: '10 $',
    location: {
        lat: 40.7484405,
        lng: -73.9878584
    },
    creator: 'u3'
 }
];

const UserClothes = () => {
    const userId = useParams().userId;
    const loadedClothes = DUMMY_CLOTHES.filter(clothes => clothes.creator === userId);
    return <ClothesList items={loadedClothes} />;
};

export default UserClothes;