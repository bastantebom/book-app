import { useContext, useEffect, useState } from "react";
import "./App.css";
import Api from "./services/api";
import Table from "./component/table";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Modal } from "./component/modal";
import { Context } from "./context";

function App() {
  const [books, setBooks] = useState();
  const [isAdding, setIsAdding] = useState(false);
  const { newBook } = useContext(Context);

  const getAllBooks = async () => {
    const resp = await Api.getBooks();
    if (resp) {
      setBooks(resp);
    }
  };

  const onDeleteBook = async (row) => {
    console.log(row.original.isbn);
    const resp = await Api.deleteBook(row.original.isbn);
    console.log(resp);
    if (resp) {
      setBooks(resp);
    }
  };

  const onAdd = async () => {
    setIsAdding(true);
  };

  const columns = [
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Author",
      accessor: "author_name",
    },
    {
      Header: "Publication Year",
      accessor: "publication_year",
    },
    {
      Header: "ISBN",
      accessor: "isbn",
    },
    {
      Header: "Action",
      action: "id",
      Cell: (props) => (
        <div className="flex flex-row space-x-4">
          <div className="flex flex-row justify-between items-center">
            <div onClick={() => onDeleteBook(props.row)}>
              <TrashIcon className="w-5 fill-sky-700 hover:fill-sky-400" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllBooks();
  }, []);

  useEffect(() => {
    if (newBook === true) {
      getAllBooks();
    }
  }, [newBook]);

  return (
    <>
      <Modal isOpen={isAdding} setIsOpen={setIsAdding} />

      <div className="min-h-screen bg-gray-100 text-gray-900">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-3">
          {books && <Table columns={columns} data={books} />}
        </main>
        <div className="absolute right-5 bottom-5">
          <div onClick={onAdd}>
            <PlusCircleIcon className="w-10 fill-sky-700 hover:fill-sky-400" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
