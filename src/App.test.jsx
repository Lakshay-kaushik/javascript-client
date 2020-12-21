import ReactDom from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/A Valid Input/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/An Input with an errors/i);
  expect(linkElement).toBeInTheDocument();
});