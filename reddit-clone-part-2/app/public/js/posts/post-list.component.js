(function() {
  'use strict'

  angular.module('app')
    .component('postList', {
      require: {
        layout: '^app'
      },
      templateUrl: '/js/posts/post-list.template.html',
      controller: controller
    })

  controller.$inject = ['$http', '$stateParams'];

  function controller($http, $stateParams) {

    this.$onInit = () => {

      this.sortBy = '-vote_count';
      $http.get('api/posts').then(data => {
        console.log(data.data);
        this.posts = data.data;
      });

      this.displayed = false;
    };

    this.addComment = (ev, post) => {
      $http.post(`/api/posts/${post.id}/comments`, {
        content: ev.target.content.value,
        post_id: post.id
      }).then(response => {
        post.comments.push(response.data);
        ev.target.content.value = '';
      });
    }

    this.toggleComments = (post) => {
      post.commentsDisplayed = !post.commentsDisplayed;
    }

    this.togglePost = () => {
      this.displayed = !this.displayed;
    };

    this.validate = (ev) => {
      if (this.newPostForm[ev.target.name].$invalid) {
        ev.target.classList.add('hayden');
        ev.target.setAttribute('placeholder', 'Required');
      } else {
        ev.target.classList.remove('hayden');
        ev.target.setAttribute('placeholder', '');
      }
    };

    this.createPost = () => {
      if (this.newPostForm.$valid) {
        this.post.vote_count = 0;
        this.post.created_at = new Date();
        this.post.comments = new Array();
        $http.post(`/api/posts`, this.post).then((response) => {
          this.post.id = response.data.id;
          this.posts.push(this.post);
          delete this.post;
        });
      }
    };

    this.voteUp = (post) => {
      $http.post(`/api/posts/${post.id}/votes`).then(data => {
        post.vote_count = data.data.vote_count;
      });
    };

    this.voteDown = (post) => {
      if (post.vote_count > 0) {
        $http.delete(`/api/posts/${post.id}/votes`).then(data => {
          post.vote_count = data.data.vote_count;
        });
      }
    };

  }

}());
