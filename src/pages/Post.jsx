import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        // console.log("Postp",post)
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-10 bg-gray-50 min-h-screen">
      {/* Added bg-gray-50 for better contrast and min-h-screen for full-page height */}

      <Container>
        <div className="w-full flex justify-center mb-6 relative border border-gray-200 rounded-xl p-4 bg-white shadow-lg transition-transform transform hover:scale-[1.02]">
          {/* Added subtle shadow, hover effect, and a clean white background */}

          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl w-full max-h-[500px] object-cover"
          />
          {/* Ensured the image does not overflow and scales properly */}

          {isAuthor && (
            <div className="absolute right-6 top-6 flex space-x-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500 hover:bg-green-600 transition-all">
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500 hover:bg-red-600 transition-all"
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="w-full mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-gray-800">{post.title}</h1>
          {/* Increased font size and improved contrast */}
        </div>

        <div className="browser-css text-lg leading-relaxed text-gray-700 p-4 bg-white shadow-md rounded-lg">
          {/* Added padding, shadow, and improved readability for post content */}
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
}
