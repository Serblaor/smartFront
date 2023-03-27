import useFetch from "../../hooks/useFetch";
import "./featured.css";


const Featured = () => {
  const { data, loading, error } = useFetch(
    "https://smart-2imr.onrender.com/api/hotels/countByCity?cities=medellin,bogota,cartagena,cali"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/600x600/653359.jpg?k=f2d8971a96e210e13df62e485878aa3879d51d5856e6c4cd011136e7a4033528&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Medellin</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/600x600/653310.jpg?k=ce44ae39520098ec3da816123463d3594f22425a341aeead609469d63ff6042b&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Bogotá</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/600x600/653338.jpg?k=685e6dfbea743087cddf602f58a8c48b567e82916d0e886dd104fb8348e96676&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Cartagena</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/600x600/653328.jpg?k=bada4ff3d893c0c508f7bad0d49492901d037e3e975f104f5feec480eb02f162&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Cali</h1>
              <h2>{data[3]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
