import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MdAttachMoney,
  MdCloudUpload,
  MdDelete,
  MdFastfood,
  MdFoodBank,
  MdMoney,
} from "react-icons/md";
import { categories } from "../utils/data";
import { Loader } from ".";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "./firebase.cofig";
import { getAllFoodItems, saveItem } from "../utils/firebaseData";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/stateProvider";
function CreateContainer(props) {
  // console.log("categories:", categories);
  const [{ foodIteams }, dispatch] = useStateValue();
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setField] = useState(false);
  const [msg, setMsg] = useState(null);
  const [alertStatus, setAlertstatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // console.log("msg:", msg);
  // console.log("fields:", fields);
  const uploadImage = (e) => {
    // console.log("check");
    setIsLoading(true);
    const imageFile = e.target.files[0];
    // console.log("imageFile:", imageFile);
    const storegeRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storegeRef, imageFile);
    uploadTask.on(
      `state_changed`,
      (snashot) => {
        const uploadProgress =
          (snashot.bytesTransferred / snashot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setField(true);
        setMsg(`Error While Uploading:Try Again`);
        setAlertstatus(`danger`);
        setTimeout(() => {
          setField(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setField(true);
          setMsg("image Uploaded sucessfully");
          setTimeout(() => {
            setField(false);
          }, 4000);
        });
      }
    );
  };
  const deleteImage = () => {
    // console.log("delete");
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setField(true);
      setMsg("Image Delete sucessfully");
      setAlertstatus("sucess");
      setTimeout(() => {
        setField(false);
      }, 4000);
    });
  };
  // console.log("category:", category);
  const saveDetails = () => {
    console.log("Save");
    setIsLoading(true);
    try {
      if (!title || !imageAsset || !price || !calories || !categories) {
        setField(true);
        setMsg(`Required Fill can't be empty`);
        setAlertstatus(`danger`);
        setTimeout(() => {
          setField(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          catagory: category,
          calories: calories,
          qty: 1,
          price: price,
        };
        saveItem(data);
        setIsLoading(false);
        setField(true);
        clearData();
        setMsg(`Data added sucessfully`);
        setAlertstatus(`sucess`);
        setTimeout(() => {
          setField(false);
        }, 4000);
      }
    } catch (err) {
      console.log(err);
      setField(true);
      setMsg(`Error While Uploading:Try Again`);
      setAlertstatus(`danger`);
      setTimeout(() => {
        setField(false);
        setIsLoading(false);
      }, 4000);
    }
    fetchData();
  };
  const clearData = () => {
    setTitle("");
    setCalories("");
    setCategory("Select Catagory");
    setPrice("");
    setImageAsset(null);
  };
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEAMS,
        foodIteams: data,
      });
    });
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center ">
      <div className="w-[90%] md:w-[75%] border border-gray-500 rounded-lg p-4 flex flex-col justify-center items-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className="w-full py-full border-gray bg-gray-200 flex items-start gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title.."
            className="w-full h-full text-lg bg-transparent  outline-none border-none placeholder:text-gray-500 text-textColor"
          />
        </div>
        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full outline-none border-gray-200 border-b-2 rounded-md cursor-pointer"
          >
            <option value="others" className="bg-white">
              Select Catagory
            </option>
            {categories &&
              categories.map((el) => {
                return (
                  <option
                    key={el.id}
                    className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  >
                    {el.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="upload image"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absloute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-roe items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Calories"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-500 text-textColor"
            />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-roe items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-500 text-textColor"
            />
          </div>
        </div>
        <div className="flex items-center w-full ">
          <button
            onClick={saveDetails}
            type="button"
            className="ml-0 md:ml-auto w-full  md:w-auto border-non outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateContainer;
