import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal, { ModalProvider, BaseModalBackground } from 'styled-react-modal';
import exit from 'assets/exit.png';
import kakaomapbtn from 'assets/KakaoMapBtn.png';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
// import axios from 'axios';

const StyledModal = Modal.styled`
  width: 59.25rem;
  height: 38rem;
  background: #FFFFFF;
  box-shadow: 0rem 0.25rem 0.25rem  rgba(0, 0, 0, 0.25), 0rem 0.125rem 0.25rem  rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(0.25rem );
  border-radius: 2.188rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  opacity: ${(props) => props.opacity};
  transition : all 0.05s ease-in-out;;`;

const Title = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  justify-content: center;
  align-items: center;
  color: #ff8960;
`;
const GoButton = styled.button`
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  gap: 0.125rem;

  width: 11rem;
  height: 5rem;

  background: #ffdbac;
  border-radius: 1rem;
`;

const Atag = styled.a`
  display: block;
  color: black;
  text-align: center;
  padding: 0.875rem 1rem;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;

const ExitBtn = styled.img`
  display: flex;
  justify-content: flex-end;
  width: 1.875rem;
  height: 1.875rem;
  margin: 0.938rem;
  margin-left: 56.25rem;
  margin-top: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const ExitDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 1.875rem;
  height: 1.875rem;
  margin: 0.938rem;
  margin-left: 56.25rem;
  margin-top: 1rem;
`;

const DetailKakaoBtn = styled.div`
  position: absolute;
  top: 55%;
  left: 12.7%;
  z-index: 2;
  width: 72px;
  height: 118px;
  background-image: url(${kakaomapbtn});
  background-repeat: no-repeat;
  background-size: 100%;
  cursor: pointer;
`;

function FancyModalButton({ props }) {
  const locationLat = props.propLocation;
  const locationLng = 126.97290711826425;
  const token = localStorage.getItem('access-token');
  const position = {
    lat: locationLat,
    lng: locationLng,
  };

  useEffect(() => {}, []);
  // console.log(position);
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  function toggleModal() {
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }

  return (
    <div>
      <DetailKakaoBtn onClick={toggleModal} />
      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <ExitDiv onClick={toggleModal}>
          <ExitBtn src={exit} />
        </ExitDiv>
        <Title>카카오 맵</Title>
        <Map // 지도를 표시할 Container
          center={{ lat: position.lat, lng: position.lng }}
          style={{
            width: '100%',
            height: '450px',
          }}
          level={3} // 지도의 확대 레벨
          draggable={false}
          zoomable={false}
        >
          {position && <MapMarker position={position} />}
        </Map>
      </StyledModal>
    </div>
  );
}

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;

function KakaoMapModal(props) {
  return (
    <div className="Modal">
      <ModalProvider backgroundComponent={FadingBackground}>
        <FancyModalButton props={props} />
      </ModalProvider>
    </div>
  );
}

export default KakaoMapModal;
