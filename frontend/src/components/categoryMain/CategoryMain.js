import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Item from "../item/Item";
import "./Category.css";

function CategoryMain() {
  const { idx } = useParams();
  const [documents, setDocuments] = useState([]);

  const getDocuments = async () => {
    try {
      const json = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/document/category/${idx}`
      );
      setDocuments(json.data.data);
    } catch (error) {
      toast.error("문서 리스트 불러오기에 실패했습니다.");
    }
  };

  useEffect(() => {
    getDocuments();
  }, [idx]);

  return (
    <div className="category-main">
      {documents &&
        documents.map((document) => (
          <Item
            key={document.idx}
            idx={document.idx}
            title={document.title}
            hits={document.hits}
            category={"사건사고"}
          />
        ))}
    </div>
  );
}

export default CategoryMain;
