import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  getCustomRecipes,
  getIsOwnRecipesFetching,
  getTotalCustomRecipes,
} from 'redux/ownRecipes/ownRecipesSelectors';
import { getOwnRecipes } from 'redux/ownRecipes/ownRecipesOperations';
import { Container } from 'components/Container/Container';
import { RecipeBlock } from 'components/RecipeBlock/RecipeBlock';
import { PaginationComp } from 'components/PaginationComp/Pagination';
import { EmptyPagePlug } from 'components/EmptyPagePlug/EmptyPagePlug';
import { Title } from 'components/Title/Title';
import { Loader } from 'components/Loader/Loader';

import { ContentWrapper, Wrapper } from './MyRecipes.styled';

import img from '../../images/default.jpg';

import { scrollToTop } from 'utils/scrollUp';

const MyRecipes = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const page = search.slice(-1);
  const recipes = useSelector(getCustomRecipes);
  const total = useSelector(getTotalCustomRecipes);
  const isFetching = useSelector(getIsOwnRecipesFetching);
  const perPage = 4;
  const [pageNumber, setPageNumber] = useState(+page);

  useEffect(() => {
    dispatch(getOwnRecipes({ page: pageNumber, per_page: perPage }));
  }, [dispatch, pageNumber]);

  useEffect(() => {
    if (recipes.length < perPage)
      dispatch(getOwnRecipes({ page: pageNumber, per_page: perPage }));
    if (recipes.length <= 0)
      dispatch(getOwnRecipes({ page: pageNumber - 1, per_page: perPage }));
  }, [dispatch, recipes.length, pageNumber]);

  const handleChange = (event, value) => {
    setPageNumber(value);
    scrollToTop();
  };

  useEffect(() => {
    history(`?page=${pageNumber}`);
  }, [history, pageNumber]);

  return (
    <Wrapper>
      <Container>
        <Title>My recipes</Title>
        {isFetching ? (
          <Loader />
        ) : (
          <>
            {recipes && recipes.length > 0 ? (
              <ContentWrapper>
                {recipes.map(item => {
                  return (
                    <li key={item._id}>
                      <RecipeBlock
                        location="recipes"
                        id={item._id}
                        img={item.imgURL ?? img}
                        title={item.title ?? 'No name'}
                        text={
                          <span>
                            {item.about ?? item.description ?? 'No description'}
                          </span>
                        }
                        time={item.cookingTime ? `${item.cookingTime} min` : ''}
                      />
                    </li>
                  );
                })}
              </ContentWrapper>
            ) : (
              <EmptyPagePlug text="You currently don't have any own recipes. Let's add some!" />
            )}
            {recipes && recipes.length > 0 && (
              <PaginationComp
                count={Math.ceil(total / perPage)}
                page={pageNumber}
                handleChange={handleChange}
              />
            )}
          </>
        )}
      </Container>
    </Wrapper>
  );
};

export default MyRecipes;
