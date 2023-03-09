import sprite from '../../images/sprite.svg';
import { DeleteBtnWrapper } from './DeleteBtn.styled';

export const DeleteBtn = ({ location }) => {
  return (
    <DeleteBtnWrapper location={location}>
      <svg>
        <use href={sprite + `#trash`} />
      </svg>
    </DeleteBtnWrapper>
  );
};