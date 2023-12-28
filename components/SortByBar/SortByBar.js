import './SortByBar.scss';

function SortbyBar({setSortOrder}) {

  const handleChange = (event) => {
    setSortOrder(Number(event.target.value));
  };
  
  return (
    <div className="SortByBar">
      <div className='SortByBar__new'>
        <p>New (584)</p>
      </div>
      <div className="SortByBar__sort">
        <label htmlFor="sort-order">Sort By Price</label>
        <select name="Sort By" id="sort-order" onChange={handleChange} style={{
          height: '30px',
          padding: '0px 10px',
        }}>
          <option hidden value="default">Select</option>
          <option value="1">Low to High</option>
          <option value="2">High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default SortbyBar;