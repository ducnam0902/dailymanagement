import CustomKnob from "@/components/common/CustomKnob";
import HeadingTitle from "@/components/common/HeadingTitle";
import { useAppDispatch } from "@/redux/hooks";
import { hideLoading, showLoading } from "@/redux/loading/loading";
import TaskService from "@/services/TaskService";
import { TaskData } from "@/types/tasks";
import { FORMAT_DATE_YYYY_MM_DD } from "@/utils/format";
import moment from "moment";
import React, { useEffect, useState } from "react";
const today = moment();

const Home = () => {
  const [tasksList, setTasksList] = useState<TaskData[]>([]);
  const taskCompleted = tasksList.filter(item => item.isCompleted);
  const dispatch = useAppDispatch();
  const fetchTodayTaskList = async () => {
    const todayFormatAPI = today.format(FORMAT_DATE_YYYY_MM_DD);
    try {
      dispatch(showLoading());
      const resp = await TaskService.getTaskByDate(todayFormatAPI);
      setTasksList(resp);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    fetchTodayTaskList();
  }, []);


  return <div className="mx-6">
    <HeadingTitle title="Dashboard" />
    <CustomKnob title="Tasks" value={taskCompleted.length} max={tasksList.length} />
  </div>;
};

export default Home;
