import { splitTimeStamp } from "@/lib/spiltTimeStamp";
import categoryData from "@/typeDefiniton/categoryData";
import { useState } from "react";

export default function CategoryTableComponent({
  categoryList,
  handleEdit
}: {
  categoryList: categoryData[] | null;
  handleEdit: (editCatId: number, cName: string) => Promise<void>;
}) {

  const [editCatId, setEditCatId] = useState<number|null>(null);
  const [cName, setCName] = useState<string>("");

  const categoryListEl = categoryList?.map((cat: categoryData, key: number) => {
    const createdTimeStamp = splitTimeStamp(cat.createdAt);
    const createdDate = createdTimeStamp.date + "/" + createdTimeStamp.month + "/" + createdTimeStamp.year;
    if(cat._id !== editCatId) {
      return (
        <tr key={key}>
          <td>{cat.c_name}</td>
          <td
            style={{
              color: cat.c_type === "income" ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {cat.c_type}
          </td>
          <td>{createdDate}</td>
          <td>
            <button className="btn btn-warning" onClick={e => { 
              setEditCatId(cat._id);
              setCName(cat.c_name);
            }}>Edit</button>
          </td>
        </tr>
      );
    } else {
      return (
        <tr key={key}>
          <td>
            <input type="text" className="input" value={cName} onChange={e => setCName(e.target.value)} />
          </td>
          <td
            style={{
              color: cat.c_type === "income" ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {cat.c_type}
          </td>
          <td>{createdDate}</td>
          <td>
            <button className="btn btn-primary" onClick={e => { 
              handleEdit(editCatId ? editCatId: 0, cName);
              setEditCatId(null);
            }}>Update</button>
          </td>
        </tr>
      );
    }
  });

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Category Type</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        {categoryList && categoryList.length > 0 ? (
          <tbody>{categoryListEl}</tbody>
        ) : null}
      </table>
      {categoryList && categoryList.length > 0 ? null : (
        <p style={{ color: "Red", fontWeight: "bold" }}>No Data</p>
      )}
    </>
  );
}
