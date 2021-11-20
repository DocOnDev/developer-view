<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Code Joy</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-nav-item href="#">About</b-nav-item>
            <b-nav-item href="#" disabled>Contact</b-nav-item>
         </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form> -->

          <b-nav-item-dropdown text="Repository" right>
            <b-dropdown-item :key="r" v-for="(repo, r) in repositories" :to="{ name: 'repos', params: { slug: repo.slug } }">{{repo.name}}</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>


<script>
  import gql from "graphql-tag";

  export const SINGLE_QUERY = gql`
  query GetRepos {
    repositories {
    id
    name
    slug
    }
  }`;

  export default {
    apollo: {
      repositories: {
        query: SINGLE_QUERY,
        },
      },
  };
</script>
