if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([
      { id: 1, first_name: "Tuan", last_name: "Dat", email: "dat@gmail.com", password: "123456" },
      { id: 2, first_name: "Hai", last_name: "Yen", email: "yen@gmail.com", password: "654321" },
    ]));
  }
  
  if (!localStorage.getItem("posts")) {
    localStorage.setItem("posts", JSON.stringify([
      { id: 1, title: "Post 1", content: "Content of Post 1", image: "image1.jpg", created_at: "2024-01-01", updated_at: "2024-01-02", user_id: 1 },
      { id: 2, title: "Post 2", content: "Content of Post 2", image: "image2.jpg", created_at: "2024-01-03", updated_at: "2024-01-04", user_id: 2 },
    ]));
  }
  
  let users = JSON.parse(localStorage.getItem("users"));
  let posts = JSON.parse(localStorage.getItem("posts"));
  
  function updateLocalStorage() {
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("posts", JSON.stringify(posts));
  }
  
  document.getElementById("btnLogin").onclick = function () {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
  
    if (!email || !password) {
      alert("Hãy nhập đầy đủ thông tin");
      return;
    }
  
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      alert(`Xin chào ${user.first_name} ${user.last_name}`);
    } else {
      alert("Thông tin tài khoản không chính xác");
    }
  };
  
  document.getElementById("btnRegister").onclick = function () {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
  
    if (!firstName || !lastName || !email || !password) {
      alert("Hãy nhập đầy đủ thông tin");
      return;
    }
  
    const exists = users.some(u => u.email === email);
    if (exists) {
      alert("Email này đã có tài khoản");
    } else {
      const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      };
      users.push(newUser);
      updateLocalStorage(); 
      alert("Đăng ký thành công!");
    }
  };
  
  document.getElementById("btnSearchUsers").onclick = function () {
    const keyword = document.getElementById("searchKeyword").value.trim().toLowerCase();
    const userList = document.getElementById("userList");
    userList.innerHTML = "";
  
    const filteredUsers = users.filter(u =>
      u.first_name.toLowerCase().includes(keyword) ||
      u.last_name.toLowerCase().includes(keyword) ||
      u.email.toLowerCase().includes(keyword)
    );
  
    const listToDisplay = filteredUsers.length ? filteredUsers : users;
    listToDisplay.forEach(u => {
      userList.innerHTML += `<p>ID: ${u.id}, Name: ${u.first_name} ${u.last_name}, Email: ${u.email}</p>`;
    });
  };
  
  document.getElementById("btnViewPosts").onclick = function () {
    const postList = document.getElementById("postList");
    postList.innerHTML = "";
  
    posts.forEach(post => {
      const user = users.find(u => u.id === post.user_id);
      postList.innerHTML += `<p>ID: ${post.id}, Title: ${post.title}, Created by: ${user.first_name} ${user.last_name}, Date: ${post.created_at}</p>`;
    });
  };
  
  document.getElementById("btnViewPostDetail").onclick = function () {
    const postId = document.getElementById("postId").value;
    const postDetail = document.getElementById("postDetail");
    postDetail.innerHTML = "";
  
    const post = posts.find(p => p.id === parseInt(postId));
    if (post) {
      const user = users.find(u => u.id === post.user_id);
      postDetail.innerHTML = `
        <h3>${post.title}</h3>
        <p>Content: ${post.content}</p>
        <p>Image: ${post.image}</p>
        <p>Created by: ${user.first_name} ${user.last_name}</p>
        <p>Created at: ${post.created_at}</p>
        <p>Updated at: ${post.updated_at}</p>
      `;
    } else {
      alert("Không tìm thấy bài viết này");
    }
  };
  
  document.getElementById("btnSearchPostsByUser").onclick = function () {
    const email = document.getElementById("searchEmail").value.trim();
    const userPosts = document.getElementById("userPosts");
    userPosts.innerHTML = "";
  
    const user = users.find(u => u.email === email);
    if (user) {
      const userPostList = posts.filter(p => p.user_id === user.id);
      userPostList.forEach(post => {
        userPosts.innerHTML += `<p>ID: ${post.id}, Title: ${post.title}</p>`;
      });
    } else {
      alert("Không tìm thấy user này");
    }
  };
  