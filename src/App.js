import {Products} from "./pages/Products";
import {postsDataUrl} from "./constants/dataUrl";

const App = () => {
  return (
    <>
      <Products dataUrl={postsDataUrl} />
    </>
  );
};

export default App;


