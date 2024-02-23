import AllCards from "./components/AllCards/AllCards";
import CommentsList from "./components/CommentsList/CommentsList";
import MyNavbar from "./components/Navbar/Navbar";

function App() {
  return (
<>
<MyNavbar />
<div className="grid grid-cols-3 gap-4 mt-10">
    <div className="col-span-2 grid grid-cols-3 gap-4" >
      <AllCards />
    </div>
    <div className="px-5">
      <CommentsList />
    </div>
</div>
</>
  );
}

export default App;
