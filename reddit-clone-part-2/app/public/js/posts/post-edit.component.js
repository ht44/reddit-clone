(function() {
  'use strict'

  angular.module('app')
    .component('postEdit', {
      require: {
        layout: '^app'
      },
      templateUrl: '/js/posts/post-edit.template.html',
      controller: controller
    })

  controller.$inject = ['$http', '$stateParams', '$state'];

  function controller($http, $stateParams, $state) {

    this.$onInit = () => {
      $http.get(`/api/posts/${$stateParams.id}`).then(response => {
        this.post = response.data;
        console.log(this.post);
      });
    };

    // this.toggleComments = (post) => {
    //   post.commentsDisplayed = !post.commentsDisplayed;
    // }
    //
    this.validate = (ev) => {
      if (this.newPostForm[ev.target.name].$invalid) {
        ev.target.classList.add('hayden');
        ev.target.setAttribute('placeholder', 'Required');
      } else {
        ev.target.classList.remove('hayden');
        ev.target.setAttribute('placeholder', '');
      }
    };

    this.updatePost = (ev) => {
      ev.preventDefault();
      if (this.newPostForm.$valid) {
        $http.patch(`/api/posts/${$stateParams.id}`, this.post).then(response => {
          console.log(response.data);
          $state.go('posts');
        });
      }
    };

  }

}());
