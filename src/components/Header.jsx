import reactLogo from '../images/react.svg';

const Header = () => {
  return (
    <header>
      <h1>Naughts And Crosses</h1>
      <img src={reactLogo} className="logo react" alt="React logo" />
    </header>
  );
};
export default Header;