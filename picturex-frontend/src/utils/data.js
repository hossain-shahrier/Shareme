export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == "${userId}"]`;
  return query;
};
// Specific Post
export const searchQuery = (searchTerm) => {
  const query = `*[_type=="post" && title match '${searchTerm}* || category match '${searchTerm}* || about match '${searchTerm}*']{
    image{
      asset ->{
        url
      }
    },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
  }`;
  return query;
};

// All post
export const feedQuery = `*[_type == 'post']| order(_createdAt desc) {
  image{
    asset ->{
      url
    }
  },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
}`;
