import styled from 'styled-components';

const ButtonContainer = styled.button`
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  background: transparent;
  padding: 0;
  font-size: inherit;
  font-family: inherit;

  &.learn-more {
    width: 12rem;
    height: auto;

    .circle {
      transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
      position: relative;
      display: block;
      margin: 0;
      width: 3rem;
      height: 3rem;
      background: #3b7ba4;
      border-radius: 1.625rem;

      .icon {
        transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        background: #fff;

        &.arrow {
          transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
          left: 1rem;
          width: 1.125rem;
          height: 0.125rem;
          background: none;

          &::before {
            position: absolute;
            content: '';
            top: -0.27rem;
            right: 0;
            left: 0;
            width: 0.625rem;
            height: 0.625rem;
            border-top: 0.125rem solid ;
            border-right: 0.125rem solid #fff;
            transform: rotate(-135deg); /* Cambiar la rotación a -135deg */
          }
        }
      }
    }

    .button-text {
      transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
      position: absolute;
      top: 0;
      left: 0.5rem;
      right: 0;
      bottom: 0;
      padding: 0.75rem 0;
      margin: 0 0 0 1.85rem;
      color: #282936;
      font-weight: 700;
      line-height: 1.6;
      text-align: center;
      text-transform: uppercase;
    }

    &:hover .circle {
      width: 100%;
    }

    &:hover .circle .icon.arrow {
      background: #fff;
      transform: translate(1rem, 0);
    }

    &:hover .button-text {
      color: #fff;
    }
  }
`;

const ButtonBack = () => {
  return (
    <ButtonContainer className="learn-more">
      <div className="circle">
        <div className="icon arrow"></div>
      </div>
      <span className="button-text"> Volver Atrás</span>
    </ButtonContainer>
  );
};

export default ButtonBack;
