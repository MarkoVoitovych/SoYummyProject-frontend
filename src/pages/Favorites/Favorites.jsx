import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFavoriteRecipes,
  getIsOwnRecipesFetching,
  getTotalFavoriteRecipes,
} from 'redux/ownRecipes/ownRecipesSelectors';
import { getFavorite } from 'redux/ownRecipes/ownRecipesOperations';

import { Container } from 'components/Container/Container';
import { Title } from 'components/Title/Title';
import { RecipeBlock } from 'components/RecipeBlock/RecipeBlock';
import { PaginationComp } from 'components/PaginationComp/Pagination';
import { EmptyPagePlug } from 'components/EmptyPagePlug/EmptyPagePlug';
import { Loader } from 'components/Loader/Loader';

import img from '../../images/default.jpg';

import { ContentWrapper, Wrapper } from './Favorites.styled';

import { scrollToTop } from 'utils/scrollUp';

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(getFavoriteRecipes);
  const total = useSelector(getTotalFavoriteRecipes);
  const isFetching = useSelector(getIsOwnRecipesFetching);
  const perPage = 4;
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getFavorite({ page: page, per_page: perPage }));
  }, [dispatch, page]);

  useEffect(() => {
    if (favorites.length < perPage)
      dispatch(getFavorite({ page: page, per_page: perPage }));
    if (favorites.length <= 0)
      dispatch(getFavorite({ page: page - 1, per_page: perPage }));
  }, [dispatch, favorites.length, page]);

  const handleChange = (event, value) => {
    setPage(value);
    scrollToTop();
  };

  return (
    <Wrapper>
      <Container>
        <Title>Favorites</Title>
        {isFetching ? (
          <Loader />
        ) : (
          <>
            {favorites && favorites.length > 0 ? (
              <ContentWrapper>
                {favorites.map(item => {
                  return (
                    <li key={item.idMeal}>
                      <RecipeBlock
                        location="favorite"
                        id={item.idMeal}
                        img={item.strMealThumb ?? img}
                        title={item.strMeal ?? 'No name'}
                        text={
                          <span>
                            {item.strInstructions ?? 'No description'}
                          </span>
                        }
                        time={item.cookingTime ? `${item.cookingTime} min` : ''}
                      />
                    </li>
                  );
                })}
              </ContentWrapper>
            ) : (
              <EmptyPagePlug text="You currently don't have any favorite recipes. Let's add some!" />
            )}
            {favorites && favorites.length > 0 && (
              <PaginationComp
                count={Math.ceil(total / perPage)}
                page={page}
                handleChange={handleChange}
              />
            )}
          </>
        )}
      </Container>
    </Wrapper>
  );
};

export default Favorites;
