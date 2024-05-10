import FrameComponent2 from "./FrameComponent2";
import FrameComponent3 from "./FrameComponent3";
import FrameComponent4 from "./FrameComponent4";
import FrameComponent5 from "./FrameComponent5";
import FrameComponent6 from "./FrameComponent6";
import WatchContent from "./WatchContent";
// import Razorpay from "razorpay";
import React, { useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Link,
  Avatar,
  Modal,
  IconButton,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import CloseIcon from "@mui/icons-material/Close";
import HeaderText from "./HeaderText";
import CourseMetrics from "./CourseMetrics";
import Header from "../../Header";
import Section from "../../Section";
import Section1 from "../../Section1";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CourseContentBarClosed1 from "./CourseContentBarClosed1";
import CourseContentBarClosed from "./CourseContentBarClosed";
import styles from "./Home.module.css";
import styles1 from "./FrameComponent5.module.css";
import styles2 from "./FrameComponent4.module.css";
import styles3 from "./FrameComponent3.module.css";
import styles4 from "./FrameComponent2.module.css";
import styles5 from "./HeaderText.module.css";
import styles6 from "./CourseContentBarClosed.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { pdfjs } from "react-pdf";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
const Mycoursewatch = () => {
  const BoxStyle = {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -30%)",
    width: 1000,
    height: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 8,
  };
  const stylePDF = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [singleCourse, setSingleCourse] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [name, setName] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [programmingLanguage, setProgrammingLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [language, setLanguage] = useState("");
  const [overview, setOverview] = useState("");
  const [description, setDescription] = useState("");
  const [requirement, setRequirement] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [courseImg, setCourseImg] = useState("");
  const [allContent, setAllContent] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [instructorImg, setInstructorImg] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [fileName, setFileName] = useState("");
  const [pid, setPid] = useState("");
  const handleOpenFile = () => setOpenHandleFile(true);
  const [openHandleFile, setOpenHandleFile] = React.useState(false);
  const handleCloseFile = () => setOpenHandleFile(false);

  const handleOpen = (data) => {
    setOpen(true);
    setVideoLink(data.videoLink);
    setThumbnail(data.thumbnail);
  };
  const handleOpenFiles = (data) => {
    setOpenHandleFile(true);
    setFileName(data);
  };
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [openHandle, setOpenHandle] = React.useState(false);
  const handleOpenUpdate = () => setOpenHandle(true);
  const handleCloseUpdate = () => setOpenHandle(false);
  const navigate = useNavigate();
  useEffect(() => {
    getSingleCourse();
  }, []);

  const getSingleCourse = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const id = localStorage.getItem("usercourseid");
      //   setCourseId(courseid);
      //   console.log(courseid);
      let result = await axios
        .get(`http://localhost:5000/course/user/${id}`, {})
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        //   // "Content-Type": "multipart/form-data",
        // },
        .then((result) => {
          console.log(result);
          console.log(result.data.data);
          console.log(id);
          if (result) {
            setCourseId(result.data.data._id);
            setSingleCourse(result.data.data);
            setCourseImg(result.data.data.courseImg);
            setName(result.data.data.name);
            setCategoryName(result.data.data.category._id);
            setInstructorName(result.data.data.instructor.name);
            setInstructorImg(result.data.data.instructor.profileImg);
            setSubCategory(result.data.data.subCategory._id);
            setProgrammingLanguage(result.data.data.programmingLanguage._id);
            setLanguage(result.data.data.language._id);
            setLevel(result.data.data.level);
            setDescription(result.data.data.description);
            setOverview(result.data.data.overview);
            setRequirement(result.data.data.requirement);
            setPrice(result.data.data.price);
            setDiscount(result.data.data.discount);
            setDeadline(result.data.data.deadline);
            setAllContent(result.data.data.content);
            console.log(result.data.data.content);
            console.log(allContent);
          }
        })
        .catch((err) => {
          console.log(err.response);
          console.log(accessToken);
          console.log(id);
        });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  const handleMycourse = () => {
    navigate("/mycourse");
  };
  const mycourse = async (res, data) => {
    try {
      const accessToken = JSON.parse(
        localStorage.getItem("accessTokenOfUser") || ""
      );
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const userCourse = localStorage.getItem("userbuycourse");
      console.log(accessToken);
      console.log(res.razorpay_payment_id);
      console.log(userCourse);
      const fields = {
        paymentId: res.razorpay_payment_id,
        course: userCourse,
      };
      let result = await axios
        .post(`http://localhost:5000/mycourses`, fields, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log("Created");
          console.log(result);
          console.log(result.data.data);
          // toast.success(result.data.message);
          // closeEvent();
          setTimeout(() => {
            navigate("/mycourse");
          }, 3000);
        })
        .catch((err) => {
          console.log(err.response);
          // toast.error(err.response.data.message);
          // console.log(response.data.data.message);
          console.log(accessToken);
          // console.log(result);
        });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  const navigation = [
    {
      id: "0",
      title: "About Course",
      url: "#about-course",
    },
    {
      id: "1",
      title: "Course Content",
      url: "#course-content",
    },
    {
      id: "2",
      title: "About Publisher",
      url: "#about-publisher",
    },
  ];

  return (
    <div className={styles.home}>
      <Header />
      <section className={styles.header}>
        <div className={styles.bg} />
        <div className={styles.breadcrumb}>
          <div className={styles.breadcrumb1}>
            <div className={styles.courses}>Courses</div>
            <div className={styles.iconOutlinedArrowRighWrapper}>
              <div className={styles.iconOutlinedArrowRigh}>
                <div className={styles.bgParent}>
                  <div className={styles.bg1} />
                  <div className={styles.color} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.breadcrumb2}>
            <div className={styles.designCourses}>Design Courses</div>
            <div className={styles.iconOutlinedArrowRighContainer}>
              <div className={styles.iconOutlinedArrowRigh1}>
                <div className={styles.bgGroup}>
                  <div className={styles.bg2} />
                  <div className={styles.color1} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.breadcrumb3}>
            <div className={styles.iconOutlinedArrowRigh2}>
              <div className={styles.bg3} />
              <div className={styles.color2} />
            </div>
            <div className={styles.webDesign}>Web Design</div>
          </div>
        </div>
        <div className={styles.headerTextParent}>
          {/* <HeaderText /> */}
          <div className={styles5.headerText}>
            <div className={styles5.tag}>
              <div className={styles5.bg} />
              <div className={styles5.mostSubscribed}>Most Subscribed</div>
            </div>
            <div className={styles5.subTextParent}>
              <h1 className={styles5.subText}>{singleCourse.name}</h1>
              <div className={styles5.courseName}>{singleCourse.overview}</div>
              <div className={styles5.highlights}>
                {/* <img
            className={styles5.iconFilledStar}
            loading="lazy"
            alt=""
            src="/icon--filled--star.svg"
          /> */}
                {/* <b className={styles5.b}>4.5</b> */}
                {/* <div className={styles5.reviewsWrapper}>
                  <div className={styles5.reviews}>
                    (<span className={styles5.reviews1}>2,540 Reviews</span>)
                  </div>
                </div> */}
                <div className={styles5.highlightsInner}>
                  <div className={styles5.frameChild} />
                </div>
                <div className={styles5.publishedByParent}>
                  <div className={styles5.publishedBy}>Published By</div>
                  <div className={styles5.joeNatoli}>{instructorName}</div>
                  <div className={styles5.iconFilledCheck}>
                    <div className={styles5.boundParent}>
                      <div className={styles5.bound} />
                      <div className={styles5.color} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles5.bottunOutlinedWithIconParent}></div>
            {/* <img className={styles5.dotsIcon} loading="lazy" alt="" src="/dots.svg" /> */}
          </div>
          {/* <Video /> */}
        </div>
      </section>
      <CourseMetrics />
      <FrameComponent6 />

      {/* <FrameComponent5 />  About Course*/}
      <section className={styles1.homeInner} id="about-course">
        <div className={styles1.frameParent}>
          <div className={styles1.heading2Parent}>
            <div className={styles1.heading2}>
              <div className={styles1.subHeading}>
                <div className={styles1.lineWrapper}>
                  <div className={styles1.line} />
                </div>
                <b className={styles1.aboutCourse}>About Course</b>
              </div>
            </div>
            <div className={styles1.frameGroup}>
              <div className={styles1.detailsParent}>
                <b className={styles1.details}>Details:</b>
                <div className={styles1.textBox}>{singleCourse.overview}</div>
              </div>
              <div className={styles1.textBoxParent}>
                <div className={styles1.textBox1}>
                  {singleCourse.description}
                </div>
                <div className={styles1.bulletPoint}>
                  <div className={styles1.iconOutlinedBullet}>
                    <div className={styles1.bgParent}>
                      <div className={styles1.bg} />
                      <div className={styles1.color} />
                    </div>
                  </div>
                  <div className={styles1.applyUxStrategies}>
                    {singleCourse.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles1.featuresParent}>
            <div className={styles1.features}>
              <div className={styles1.features1}>
                <Card sx={{ width: 385, height: 420 }}>
                  <CardMedia
                    sx={{ height: 200 }}
                    image={singleCourse.courseImg}
                    title={singleCourse.name}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      component="div"
                      style={{ fontWeight: "bold", fontSize: "15px" }}
                    >
                      {singleCourse.name}
                    </Typography>
                    <Box
                      gap="5px"
                      marginTop="5px"
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        style={{ fontWeight: "bold", fontSize: "15px" }}
                      >
                        Price :Rs.{singleCourse.price}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        style={{ fontWeight: "bold", fontSize: "15px" }}
                      >
                        discount : {singleCourse.discount}%
                      </Typography>
                    </Box>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      style={{ fontWeight: "bold", fontSize: "15px" }}
                    >
                      Level : {singleCourse.level}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      style={{ fontWeight: "bold", fontSize: "15px" }}
                    >
                      {/* language : {singleCourse.language.languageName} */}
                    </Typography>
                    <Box
                      gap="5px"
                      marginTop="5px"
                      display="flex"
                      justifyContent="start"
                      alignItems="center"
                    >
                      <Avatar alt={instructorName} src={instructorImg} />
                      <Typography
                        gutterBottom
                        component="div"
                        style={{ fontWeight: "bold", fontSize: "15px" }}
                      >
                        {instructorName}
                      </Typography>
                    </Box>
                  </CardContent>
                  <Box>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        // onClick={() => {
                        //   paymentHandler();
                        // }}
                        style={{
                          textTransform: "none",
                          color: "#fff",
                          fontSize: "18",
                          background: "#7718eb",
                          borderRadius: "8px",
                          border: "none",
                          "&:hover": { background: "#f4ebff" },
                        }}
                      >
                        Enrolled
                      </Button>
                    </CardActions>
                  </Box>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <FrameComponent4 />  Course Content*/}
      <section className={styles2.homeInner} id="course-content">
        <div className={styles2.heading01Parent}>
          <div className={styles2.heading01}>
            <div className={styles2.subHeading}>
              <div className={styles2.line} />
              <b className={styles2.ccourseContent}>Course Content</b>
            </div>
            <div className={styles2.mainHeading}>
              <h1
                className={styles2.ourCoursesAre}
              >{`Our courses are balanced mix of videos & articles`}</h1>
            </div>
          </div>
          <div className={styles2.frameParent}>
            <div className={styles2.frameGroup}>
              <div className={styles2.lessonsParent}>
                <div className={styles2.lessons}>3 Lessons</div>
                <div className={styles2.iconOutlinedBullet}>
                  <div className={styles2.bgParent}>
                    <div className={styles2.bg} />
                    <div className={styles2.color} />
                  </div>
                </div>
                <div className={styles2.videos}>3 Videos</div>
                <div className={styles2.h32mComplition}>
                  125 Mins Complition Time
                </div>
              </div>
              <b className={styles2.expandAllLessons}>Expand All Lessons</b>
            </div>
            <div className={styles2.courseContentBarClosedParent}>
              <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={BoxStyle}>
                  <Box sx={{ m: 2 }}>
                    <Typography variant="h5" align="left ">
                      Chapter Name : {thumbnail}
                    </Typography>
                    <IconButton
                      style={{ position: "absolute", top: "0", right: "0" }}
                      onClick={handleClose}
                    >
                      <CloseIcon />
                    </IconButton>
                    <Box
                      sx={{
                        marginTop: "5px",
                      }}
                    >
                      <ReactPlayer
                        url={videoLink}
                        height="420px"
                        width="500"
                        controls="true"
                      ></ReactPlayer>
                    </Box>
                  </Box>
                </Box>
              </Modal>
              {allContent.map((ele, i) => {
                return ele.map((e) => {
                  return (
                    <div className={styles6.courseContentBarClosed}>
                      <div className={styles6.bg} />

                      <div className={styles6.definitionPlanningFor}>
                        {/* {e.chapterDetailes.chapterName} */}
                        <div fullWidth>
                          <Accordion defaultExpanded fullWidth>
                            <AccordionSummary
                              fullWidth
                              expandIcon={<ExpandMoreIcon />}
                            >
                              <Typography
                                className={styles6.definitionPlanningFor}
                              >
                                {/* An Important Question */}
                                {e.chapterDetailes.chapterName}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography
                                onClick={() =>
                                  handleOpen(e.contentVideoDetailes)
                                }
                                style={{
                                  cursor: "pointer",
                                }}
                              >
                                <PlayCircleFilledIcon
                                  style={{
                                    marginRight: "15px",
                                    fontSize: "20px",
                                  }}
                                />
                                {e.contentVideoDetailes.thumbnail}{" "}
                              </Typography>
                              <Typography
                                style={{
                                  marginTop: "8px",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handleOpenFiles(e.contentFileDetailes.name)
                                }
                              >
                                <FileOpenIcon
                                  style={{
                                    marginRight: "15px",
                                    fontSize: "20px",
                                  }}
                                />
                                {e.contentFileDetailes.name}
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      </div>
                      <Modal
                        open={openHandleFile}
                        // onClose={handleCloseFile}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        // onClick={handleOpenFile}
                      >
                        <Box sx={stylePDF}>
                          <div>
                            <IconButton
                              style={{
                                position: "absolute",
                                top: "1",
                                right: "0",
                              }}
                              onClick={handleCloseFile}
                            >
                              <CloseIcon />
                            </IconButton>
                            <div
                              style={{
                                border: "1px solid rgba(0, 0, 0, 0.3)",
                                height: "600px",
                                width: "1000px",
                              }}
                            >
                              <iframe
                                src={`http://localhost:5000/uploads/${fileName}`}
                                width="800"
                                height="600"
                              />
                            </div>

                            {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                              <div
                                style={{
                                  border: "1px solid rgba(0, 0, 0, 0.3)",
                                  height: "550px",
                                  width: "500",
                                }}
                              >
                                <Viewer
                                  fileUrl={`http://localhost:5000/uploads/${fileName}`}
                                />
                              </div>
                            </Worker> */}
                          </div>
                        </Box>
                      </Modal>

                      {/* <div className={styles6.sections30}> */}
                      {/* <Button
                        onClick={() => handleOpen(e.contentVideoDetailes)}
                      >
                        Watch
                      </Button> */}
                      {/* </div> */}
                    </div>
                  );
                });
              })}

              {/* <CourseContentBarClosed
                definitionPlanningForSucc="Intorduction to Python Language"
                sections30Minutes="1 Sections "
              />
              <CourseContentBarClosed
                definitionPlanningForSucc="Variables and Datatypes in python language"
                sections30Minutes="1 Sections "
              />
              <CourseContentBarClosed
                definitionPlanningForSucc="Loops in python language"
                sections30Minutes="1 Sections "
              /> */}
              {/* <CourseContentBarClosed
                definitionPlanningForSucc="Information Architecture: Creating a Solid Foundation"
                sections30Minutes="6 Sections . 120 minutes"
              /> */}
              {/* <div className={styles2.courseContentBarOpen}>
                <div className={styles2.bg4} />
                <img className={styles2.bgIcon} alt="" src="/bg.svg" />
                <div className={styles2.frameContainer}>
                  <div className={styles2.iconOutlinedMinusWrapper}>
                    <div className={styles2.iconOutlinedMinus}>
                      <div className={styles2.bgParent1}>
                        <div className={styles2.bg5} />
                        <div className={styles2.color4} />
                      </div>
                    </div>
                  </div>
                  <div className={styles2.informationArchitectureCrea}>
                    Information Architecture: Creating a Solid Foundation Part
                    02
                  </div>
                  <div className={styles2.sections89}>
                    5 Sections . 89 minutes
                  </div>
                </div>
                <div className={styles2.lessonParent}>
                  <div className={styles2.lesson}>
                    <div className={styles2.iconFilledVideo}>
                      <div className={styles2.bgParent2}>
                        <div className={styles2.bg6} />
                        <div className={styles2.color5} />
                      </div>
                    </div>
                    <div className={styles2.exerciseTurningInformation}>
                      Exercise: Turning Information Priority into an IA Model
                    </div>
                    <div className={styles2.watchDemo}>Watch Demo</div>
                    <div className={styles2.minutes}>6 minutes</div>
                  </div>
                  <div className={styles2.lesson1}>
                    <img
                      className={styles2.iconFilledArticle}
                      loading="lazy"
                      alt=""
                      src="/icon--filled--article.svg"
                    />
                    <div className={styles2.iaModelsWhichOnesRightFWrapper}>
                      <div className={styles2.iaModelsWhich}>
                        IA Models: Which One's Right for My Site?
                      </div>
                    </div>
                    <div className={styles2.watchDemo1}>Watch Demo</div>
                    <div className={styles2.minutes1}>8 minutes</div>
                  </div>
                  <div className={styles2.lesson2}>
                    <div className={styles2.iconFilledVideo1}>
                      <div className={styles2.bgParent3}>
                        <div className={styles2.bg7} />
                        <div className={styles2.color6} />
                      </div>
                    </div>
                    <div className={styles2.hierarchicalTreeIaModelWrapper}>
                      <div className={styles2.hierarchicalTreeIa}>
                        Hierarchical Tree IA Model
                      </div>
                    </div>
                    <div className={styles2.watchDemo2}>Watch Demo</div>
                    <div className={styles2.minutes2}>15 minutes</div>
                  </div>
                  <div className={styles2.lesson3}>
                    <div className={styles2.iconFilledVideoParent}>
                      <div className={styles2.iconFilledVideo2}>
                        <div className={styles2.bgParent4}>
                          <div className={styles2.bg8} />
                          <div className={styles2.color7} />
                        </div>
                      </div>
                      <div className={styles2.combiningIaModels}>
                        Combining IA Models
                      </div>
                    </div>
                    <div className={styles2.watchDemo3}>Watch Demo</div>
                    <div className={styles2.minutes3}>20 minutes</div>
                  </div>
                  <div className={styles2.lesson4}>
                    <img
                      className={styles2.iconFilledArticle1}
                      alt=""
                      src="/icon--filled--article.svg"
                    />
                    <div className={styles2.toolsForCreatingIaModelsWrapper}>
                      <div className={styles2.toolsForCreating}>
                        Tools for Creating IA Models
                      </div>
                    </div>
                    <div className={styles2.watchDemo4}>Watch Demo</div>
                    <div className={styles2.minutes4}>40 minutes</div>
                  </div>
                </div>
              </div> */}
              {/* <CourseContentBarClosed
                definitionPlanningForSucc="Information Architecture: Creating a Solid Foundation Part 03"
                sections30Minutes="8 Sections . 180 minutes"
              />
              <CourseContentBarClosed
                definitionPlanningForSucc={`Design: Information, Interaction & Interfaces`}
                sections30Minutes="4 Sections . 60 minutes"
              />
              <CourseContentBarClosed
                definitionPlanningForSucc={`Design: Information, Interaction & Interfaces Part 02`}
                sections30Minutes="2 Sections . 58 minutes"
              />
              <CourseContentBarClosed
                definitionPlanningForSucc={`Design: Information, Interaction & Interfaces Part 03`}
                sections30Minutes="3 Sections . 32 minutes"
              />
              <CourseContentBarClosed1
                courseOverview={`Launch & Beyond`}
                sections15Minutes="4 Sections . 84 minutes"
                propMarginTop="-1px"
              /> */}
            </div>
          </div>
        </div>
      </section>

      {/* <FrameComponent3 />  About Instructor*/}
      <section className={styles3.heading01Wrapper} id="about-publisher">
        <div className={styles3.heading01}>
          <div className={styles3.subHeading}>
            <div className={styles3.lineWrapper}>
              <div className={styles3.line} />
            </div>
            <b className={styles3.aboutPublisher}>About Publisher</b>
          </div>
        </div>
      </section>
      {/* <FrameComponent2 />  All Info about Instructor*/}
      <section className={styles4.homeInner}>
        <div className={styles4.joeHasBeenPreachingAndPraParent}>
          <div className={styles4.joeHasBeen}>
            Nishit has been preaching and practicing the gospel of User
            Experience (UX) to Fortune 100, 500 and Government organizations for
            nearly 10 years. That work includes commercial industry leaders like
            Google Ventures, Kroll/Duff + Phelps, Broadridge, Conde Nast, Johns
            Hopkins, Mettler-Toledo, PHH Arval, SC Johnson and Wolters Kluwer,
            as well as government agencies like the National Science Foundation,
            National Institutes of Health and the Dept. of Homeland Security.
          </div>
          <div className={styles4.frameParent}>
            <div className={styles4.frameGroup}>
              <div className={styles4.frameContainer}>
                <div className={styles4.anudeepAyyagariParent}>
                  <h1 className={styles4.anudeepAyyagari}>{instructorName}</h1>
                  <div className={styles4.iconFilledCheckWrapper}>
                    <div className={styles4.iconFilledCheck}>
                      <div className={styles4.bound} />
                      <div className={styles4.color} />
                    </div>
                  </div>
                </div>
                <div className={styles4.yearUx}>{instructorName}</div>
              </div>
              <div className={styles4.line} />
              <div className={styles4.joeNatoliHas}>{instructorName}</div>
            </div>
          </div>
          <div className={styles4.rectangleParent}>
            <img
              className={styles4.frameChild}
              loading="lazy"
              alt={instructorName}
              src={instructorImg}
            />
            {/* <div className={styles4.iconAndTextParent}>
              <div className={styles4.iconAndText}>
                <img
                  className={styles4.iconFilledStar}
                  alt=""
                  src="/icon--filled--star-1.svg"
                />
                <div className={styles4.instructorRating}>
                  <b>4.5</b>
                  <span> Instructor Rating</span>
                </div>
              </div>
              <div className={styles4.iconAndText1}>
                <img
                  className={styles4.iconFilledRatinngs}
                  loading="lazy"
                  alt=""
                  src="/icon--filled-ratinngs.svg"
                />
                <div className={styles4.reviews}>
                  <b>28,707</b>
                  <span> Reviews</span>
                </div>
              </div>
              <div className={styles4.iconAndText2}>
                <img
                  className={styles4.iconFilledStudents}
                  loading="lazy"
                  alt=""
                  src="/icon--filled-students.svg"
                />
                <div className={styles4.students}>
                  <b>155,242</b>
                  <span> Students</span>
                </div>
              </div>
              <div className={styles4.iconAndText3}>
                <div className={styles4.iconFilledVideo}>
                  <div className={styles4.bgGroup}>
                    <div className={styles4.bg1} />
                    <div className={styles4.color1} />
                  </div>
                </div>
                <div className={styles4.courses}>
                  <b>8</b>
                  <span> Courses</span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      {/* <FrameComponent1 /> */}
      {/* <FrameComponent /> */}
      {/* <Footer /> */}
      <footer className={styles.footer}>
        <Section1 />
        <Section />
      </footer>
    </div>
  );
};

export default Mycoursewatch;