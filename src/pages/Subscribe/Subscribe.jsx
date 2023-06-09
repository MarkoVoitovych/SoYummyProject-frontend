import { Container } from 'components/Container/Container';
import { SearchNoFound } from 'components/Search/SearchNoFound/SearchNoFound';
import { useEffect, useState } from 'react';
import { subscribeEmailConfirmation } from 'service/API/Auth&UserAPI';
import { StyledLink, Wraper } from './Subscribe.styled';

const Subscribe = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get('token');
  const [text, setText] = useState('');
  const [userSubscribed, setUserSubscribed] = useState(false);

  useEffect(() => {
    if (userSubscribed) return;
    subscribeEmailConfirmation(token)
      .then(el => {
        if (el.user.subscribed)
          setText('You have subscribed to the newsletter.');
        setUserSubscribed(true);
      })
      .catch(error => setText('You haven`t subscribed. Try again later.'));
  }, [token, userSubscribed]);

  return (
    <>
      <Container>
        <Wraper>
          <SearchNoFound text={text} />
          <StyledLink to="/main">Continue...</StyledLink>
        </Wraper>
      </Container>
    </>
  );
};
export default Subscribe;
