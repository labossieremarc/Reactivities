import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Photo, Profile, UserActivity } from "../models/profile";
import { store } from "./store";

export default class ProfileStore {
  profile: Profile | null = null;
  loadingProfile: boolean = false;
  uploading: boolean = false;
  loading: boolean = false;
  followings: Profile[] = [];
  loadingFollow: boolean = false;
  activeTab: number = 0;
  userActivites: UserActivity[] = [];
  loadingActivities: boolean = false;
  activityTab: number = 4;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.activeTab,
      (activeTab) => {
        if (activeTab === 3 || activeTab === 4) {
          const predicate = activeTab === 3 ? "followers" : "following";
          this.loadFollowings(predicate);
        } else if (activeTab === 2){
          this.activityTab = 0;
        }else {
          this.followings = [];
          this.activityTab = 4;
        }
      },
    );
    reaction(
      () => this.activityTab,
      (activityTab) => {
        switch (activityTab) {
          case 0:
            this.loadUserActivities(
              store.profileStore.profile!.username,
              "future"
            );
            break;
          case 1:
            this.loadUserActivities(
              store.profileStore.profile!.username,
              "past"
            );
            break;
          case 2:
            this.loadUserActivities(
              store.profileStore.profile!.username,
              "hosting"
            );
            break;
        }
      }
    )
  }
  setActivityTab = (activityTab: number) => {
    this.activityTab = activityTab;
  }

  setActiveTab = (activeTab: number) => {
    this.activeTab = activeTab;
  };

  get isCurrentUser() {
    if (store.userStore.user && this.profile)
      return store.userStore.user.username === this.profile.username;
    else return false;
  }
  resetProfile = () => {
    this.profile = null;
  };

  loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profiles.selected(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingProfile = false));
    }
  };
  uploadPhoto = async (file: Blob) => {
    this.uploading = true;
    try {
      const response = await agent.Profiles.uploadPhoto(file);
      const photo = response.data;
      runInAction(() => {
        if (this.profile) {
          this.profile.photos?.push(photo);
          if (photo.isMain && store.userStore.user) {
            store.userStore.setImage(photo.url);
            this.profile.image = photo.url;
          }
        }
        this.uploading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.uploading = false));
    }
  };

  setMainPhoto = async (photo: Photo) => {
    this.loading = true;
    try {
      await agent.Profiles.setMainPhoto(photo.id);
      store.userStore.setImage(photo.url);
      store.activityStore.updateAttendeeImage(this.profile!.username, photo.url)
      runInAction(() => {
        if (this.profile && this.profile.photos) {
          this.profile.photos.find((p) => p.isMain)!.isMain = false;
          this.profile.photos.find((p) => p.id === photo.id)!.isMain = true;
          this.profile.image = photo.url;
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      console.log(error);
    }
  };
  deletePhoto = async (photo: Photo) => {
    this.loading = true;
    try {
      await agent.Profiles.deletePhoto(photo.id);
      runInAction(() => {
        if (this.profile) {
          this.profile.photos = this.profile.photos?.filter(
            (p) => p.id !== photo.id
          );
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      console.log(error);
    }
  };
  updateProfile = async (profile: Partial<Profile>) => {
    this.loading = true;
    try {
      await agent.Profiles.updateProfile(profile);
      store.activityStore.updateAttendeeDisplayName(this.profile!.username, profile )
      runInAction(() => {
        if (
          profile.displayName &&
          profile.displayName !== store.userStore.user?.displayName
        ) {
          store.userStore.setDisplayName(profile.displayName);
        }
        this.profile = { ...this.profile, ...(profile as Profile) };
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  toggleFollow = async (username: string, following: boolean) => {
    this.loading = true;
    try {
      await agent.Profiles.toggleFollow(username);
      store.activityStore.updateAttendeeFollowing(username);
      runInAction(() => {
        if (
          this.profile &&
          this.profile.username !== store.userStore.user?.username &&
          this.profile.username === username
        ) {
          following
            ? this.profile.followersCount++
            : this.profile.followersCount--;
          this.profile.following = !this.profile.following;
        }
        if (this.profile && this.profile.username === store.userStore.user?.username) {
          following
            ? this.profile.followingCount++
            : this.profile.followingCount--;
        }
        this.followings.forEach((profile) => {
          if (profile.username === username) {
            profile.following
              ? profile.followersCount--
              : profile.followersCount++;
            profile.following = !profile.following;
          }
        });
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        console.log(error);
        this.loading = false;
      });
    }
  };

  loadFollowings = async (predicate: string) => {
    this.loadingFollow = true;
    try {
      const followings = await agent.Profiles.listFollowing(
        this.profile!.username,
        predicate
      );
      runInAction(() => {
        this.followings = followings;
        this.loadingFollow = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingFollow = false;
      });
    }
  };

  loadUserActivities = async (username: string, predicate: string) => {
    this.loadingActivities = true;
    try {
      const activities = await agent.Profiles.listActivites(username, predicate!);
      runInAction(() => {
        this.userActivites = activities;
        this.loadingActivities = false;
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.loadingActivities = false;
      })
    }
  }
}
