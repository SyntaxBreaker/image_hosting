import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Helmet} from "react-helmet";
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  width: 480px;
  margin: 2rem auto;
  padding: 2rem 1rem;
  flex-direction: column;
  background-color: white;
  border: 2px ridge #19335A;
  align-items: center;
`;

const H2 = styled.h2`
  color: #19335A;
  text-transform: uppercase;
`;

const Input = styled.input`
  width: 75%;
  font-size: 18px;
  margin-top: 18px;
  border: none;
  border-bottom: 2px solid #697A98;
  padding: 5px;
  outline: none;
`;

const Button = styled.button`
  font-size: 18px;
  margin-top: 18px;
  outline: none;
  width: 60%;
  padding: .6rem;
  border: none;
  color: white;
  background-color: #4675C0;
`;

const ImageUploadContainer = styled.div`
  width: 75%;
  height: 5vh;
  position: relative;
  margin-top: 18px;
  border: 2px solid #697A98;
`;

const FileInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  cursor: pointer;
`;

const FileHandlerWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Upload() {
    const navigate = useNavigate();
    const [formDetails, setFormDetails] = useState(null);

    const formHandler = (event) => {
        if(event.target.name === 'image') {
            setFormDetails({
                ...formDetails,
                [event.target.name]: event.target.files[0]
            })
        } else {
            setFormDetails({
                ...formDetails,
                [event.target.name]: event.target.value
            });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('image', formDetails.image);
        formData.append('title', formDetails.title);
        formData.append('description', formDetails.description);

        fetch(`${process.env.REACT_APP_API}`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(res => navigate(`/${res.image}`));
    }

    return (
        <>
            <Helmet>
                <title>Upload an file</title>
            </Helmet>
            <Form onChange={formHandler}>
                <H2>Upload an image</H2>
                <Input type="text" name="title" placeholder="Title" />
                <Input type="text" name="description" placeholder="Description" />
                <ImageUploadContainer>
                    <FileInput type="file" name="image" />
                    <FileHandlerWrapper>
                        <p>Select a file</p>
                    </FileHandlerWrapper>
                </ImageUploadContainer>
                <Button onClick={handleSubmit}>Upload an image</Button>
            </Form>
        </>
    )
}

export default Upload;