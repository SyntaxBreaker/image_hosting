import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import styled from "styled-components";
import GlobalStyle from "./globalStyles";
import Images from './components/Images';
import Image from './components/Image';
import Upload from './components/Upload';

const Navigation = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #17322F;
  padding: .6rem;
  width: 100%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  text-align: center;
  color: white;

  &:visited {
    color: white;
  }

  &:hover {
    color: #4675C0;
  }

  @media (min-width: 1200px) {
    width: 10%;
  }
`;

function App() {
    return (
        <div>
            <GlobalStyle />
            <BrowserRouter>
                <Navigation>
                    <StyledLink to="/">Homepage</StyledLink>
                    <StyledLink to="/addImage">Upload an Image</StyledLink>
                </Navigation>
                <Routes>
                    <Route path="/" element={<Images />} />
                    <Route path=":id" element={<Image />} />
                    <Route path="/addImage" element={<Upload />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;
