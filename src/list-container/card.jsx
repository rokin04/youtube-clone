import styled from 'styled-components';

const CardStyled = styled.div`
  flex-basis: 23%;
  @media (max-width: 1000px) {
    flex-basis: 30%;
    min-height: 25vh;
  }
  @media (max-width: 768px) {
    flex-basis: 45%;
  }
  @media (max-width: 480px) {
    flex-basis: 100%;
  }
  margin: 5px;
  min-height: 20vh;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ImageContainer = styled.div`
  height: 70%;
  width: 100%;
`;

export const Card = (item) =>  (
  <CardStyled>
    <ImageContainer>
      <img src={item.item.snippet.thumbnails.high.url} alt="alt" style={{'height':'100%','width':'100%'}} />
    </ImageContainer>
    <h4 data-testid="title" style={{'margin': 0}}>{item.item.snippet.title}</h4>
    <h5 data-testid="description" style={{'margin': 0}}>{item.item.snippet.description}</h5>
  </CardStyled>
);
