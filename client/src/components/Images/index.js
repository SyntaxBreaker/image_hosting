import {useState, useEffect} from "react";
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  
  @media (min-width: 1200px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #0D0D0D;
  
  &:visited {
    color: #0D0D0D;
  }
  
  &:hover {
    color: #4675C0;
  }
  
  @media (min-width: 1200px) {
    width: 33%;
    height: 100%;
  }
`;

const ImageWrapper = styled.div`
  margin: 2rem auto;
  width: 90%;
  height: 350px;
  position: relative;
`;

const ImageInformation = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: #17322F;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1% 1% 0 0;
`;

const Title = styled.h2`
  padding: .3rem 0;
  color: white;
  font-weight: 700;
  text-align: center;
`;

const Description = styled.p`
  padding: .3rem 0;
  color: white;
  font-weight: 400;
  text-align: center;
`;


function Images() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        async function getImages() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}`);
                response.data.forEach(image => setImages(prevState => [...prevState, {id: image.id, image: image.image, title: image.title, description: image.description}]));
            } catch (error) {
                console.error(error);
            }
        }

        getImages();
    }, [])


    return (
        <>
            <Helmet>
                <title>Homepage</title>
            </Helmet>
            <ImageContainer>
                {
                    images && images.map(i => {
                        return (
                            <StyledLink to={`${i.id}`} key={i.id}>
                                <ImageWrapper>
                                    <Img src={`data:image/png;base64, ${i.image}`} />
                                    <ImageInformation>
                                        <Title>{i.title}</Title>
                                        <Description>{i.description}</Description>
                                    </ImageInformation>
                                </ImageWrapper>
                            </StyledLink>
                        )
                    })
                }
            </ImageContainer>
        </>
    );
}

export default Images;
