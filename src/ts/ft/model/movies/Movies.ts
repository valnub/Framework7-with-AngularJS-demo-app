module ft.model.movies{
  
  export interface MovieTypeState{
    active:String;
  }
  
  export interface MovieType{
    upcoming:MovieTypeState;
    theater:MovieTypeState;
  }
  
  export interface AjaxResultData{
    movies:Movie[];
  }
  
  export interface MoviePosters{
    detailed:String;
    original:String;
    profile:String;
    thumbnail:String;
  }
  
  export interface MovieRatings{
    audience_score:number;
    critics_rating:String;
    critics_critics_score:Number;
  }
  
  export interface MovieReleaseDates{
    theater:String;
  }
  
  export interface Movie{
    id:String;
    synopsis:String;
    title:String;
    posters:MoviePosters;
    ratings:MovieRatings;
    release_dates:MovieReleaseDates;
    stars:String;
    date:String;
  }
  
}