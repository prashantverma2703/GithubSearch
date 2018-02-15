$(document).ready(function(){
	$('#searchUser').on('keyup', function(e){
		let username = e.target.value;


		//ajax
		$.ajax({
			url:'https://api.github.com/users/' +username,
			data:{
				client_id:'576efc52f81232ba0510',
				client_secret:'68b1d99771ce0e7deb2cf2cb6ba9596b4132cf6a'
			}
		}).done(function(response){
			$.ajax({
				url:'https://api.github.com/users/'+username+'/repos',
				data:{
					client_id:'576efc52f81232ba0510',
				client_secret:'68b1d99771ce0e7deb2cf2cb6ba9596b4132cf6a',
				sort: 'created asc',
				per_page:5
				}
			}).done(function(repos){
        $.each(repos, function(index, repo){
          $('#repos').append(`
            <div class="well">
              <div class="row">
                <div class="col-md-7">
                  <strong>${repo.name}</strong>: ${repo.description}
                </div>
                <div class="col-md-3">
                  <span class="label label-default">Forks: ${repo.forks_count}</span>
                  <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                  <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
                </div>
              </div>
            </div>
          `);
        });
      });
			$('#profile').html(`
				<div class="panel panel-default">
				<div class="panel-heading">
				<h3 class="panel-title">${response.name}</h3>
				</div>
				<div class="panel-body">
					<div class="row">
						<div class="col-md-3">
							<img style="width:100%" class="thumbnail" src = "${response.avatar_url}">
							<a target="_blank" class="btn btn-primary btn-block" href="${response.html_url}">View Profile</a>
				</div>
				<div class="col-md-9">
					<span class="label label-default">Public Repos: ${response.public_repos}</span>
					<span class="label label-primary">Public Gists: ${response.public_gists}</span>
					<span class="label label-success">Followers: ${response.followers}</span>
					<span class="label label-info">Following ${response.following}</span>
					<br><br>
					<ul class="list-group">
						<li class="list-group-item">Company: ${response.company}</li>
						<li class="list-group-item">Website/blog: ${response.blog}</li>
						<li class="list-group-item">Location: ${response.location}</li>
						<li class="list-group-item">Member Since: ${response.created_at}</li>
					</ul>
				</div>
				</div>
				</div>


				`);
		});
	});
});