import styled from "styled-components";
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e0e0e0;
  padding: 10px 20px;
`;

const SearchBar = styled.div`
  flex-grow: 1;
  margin: 0 20px;

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const SortOptions = styled.div`
  display: flex;
  align-items: center;

  label {
    margin-left: 10px;
  }
`;
export default function NavBar() {
  return (
    <Nav>
      <SearchBar>
        <input type="text" placeholder="검색어를 입력해주세요" />
      </SearchBar>
      <SortOptions>
        <label>
          <input type="radio" name="sort" value="latest" defaultChecked />{" "}
          최신순
        </label>
        <label>
          <input type="radio" name="sort" value="rating" /> 평점순
        </label>
      </SortOptions>
    </Nav>
  );
}
