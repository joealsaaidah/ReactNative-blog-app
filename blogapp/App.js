import Slider from "./components/Slider";

const data = [
  {
    id: "1",
    thumbnail:
      "https://res.cloudinary.com/mimicucu/image/upload/v1643804380/blog-app/posts/RzvBHR6Wwl6mulZ.jpg",
    title: "First post First post First post First post First post ",
    author: "mimicucu",
  },
  {
    id: "2",
    thumbnail:
      "https://res.cloudinary.com/mimicucu/image/upload/v1643624554/blog-app/posts/vn45XSZ8S44sRvS.png",
    title: "Second post",
    author: "mimicucu",
  },
  {
    id: "3",
    thumbnail:
      "https://res.cloudinary.com/mimicucu/image/upload/v1643607235/blog-app/posts/4IKAYjM7H69gX0r.jpg",
    title: "Third post",
    author: "mimicucu",
  },
  {
    id: "4",
    thumbnail:
      "https://res.cloudinary.com/mimicucu/image/upload/v1643607104/blog-app/posts/kPOHbimWcW3Ep5Z.jpg",
    title: "Forth post",
    author: "mimicucu",
  },
];

export default function App() {
  return <Slider data={data} title='Featured Posts' />;
}
