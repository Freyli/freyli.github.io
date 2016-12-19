/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var vrView;

// All the scenes for the experience
var scenes = {
  livingroom: {
    image: 'livingroom.jpg',
    preview: 'livingroom-preview.jpg',
    hotspots: {
      stair0: {
        pitch: 0,
        yaw: 80,
        radius: 0.05,
        distance: 1
      },
      stair2: {
        pitch: 40,
        yaw: 80,
        radius: 0.05,
        distance: 1
      },
      kitchen: {
        pitch: 0,
        yaw: 170,
        radius: 0.05,
        distance: 1
      }
    }
  },
  stair2: {
    image: 'stair2.jpg',
    preview: 'stair2-preview.jpg',
    hotspots: {
      livingroom: {
        pitch: 0,
        yaw: 110,
        radius: 0.05,
        distance: 1
      },
      kitchen: {
        pitch: 0,
        yaw: 280,
        radius: 0.05,
        distance: 1
      },
      bathroom: {
        pitch: 0,
        yaw: 20,
        radius: 0.05,
        distance: 1
      },
      bedroom: {
        pitch: 0,
        yaw: 40,
        radius: 0.05,
        distance: 1
      },
      office: {
        pitch: 0,
        yaw: 90,
        radius: 0.05,
        distance: 1
      }

    }
  },
  
  bathroom: {
    image: 'bathroom.jpg',
    preview: 'bathroom-preview.jpg',
    hotspots: {
      stair2: {
        pitch: 0,
        yaw: 305,
        radius: 0.05,
        distance: 1
      },
  bedroom: {
    image: 'bedroom.jpg',
    preview: 'bedroom-preview.jpg',
    hotspots: {
      stair2: {
        pitch: 0,
        yaw: 305,
        radius: 0.05,
        distance: 1
      }
     }
  }, 
  office: {
    image: 'office.jpg',
    preview: 'office-preview.jpg',
    hotspots: {
      stair2: {
        pitch: 0,
        yaw: 305,
        radius: 0.05,
        distance: 1
      }
      
     }
  },  
   basement: {
    image: 'basement.jpg',
    preview: 'basement-preview.jpg',
    hotspots: {
      stair0: {
        pitch: 0,
        yaw: 305,
        radius: 0.05,
        distance: 1
      },
      workshop: {
        pitch: 0,
        yaw: 200,
        radius: 0.05,
        distance: 1
      }
    }
  }, 
  workshop: {
    image: 'workshop.jpg',
    preview: 'workshop-preview.jpg',
    hotspots: {
      basement: {
        pitch: 0,
        yaw: 305,
        radius: 0.05,
        distance: 1
      }
    }
  },
      
  stair0: {
    image: 'stair0.jpg',
    preview: 'stair0-preview.jpg',
    hotspots: {
      livingroom: {
        pitch: 0,
        yaw: 305,
        radius: 0.05,
        distance: 1
      },
      basement: {
        pitch: 0,
        yaw: 180,
        radius: 0.05,
        distance: 1
      },
      kitchen: {
        pitch: 0,
        yaw: 210,
        radius: 0.05,
        distance: 1
      }
    }
  },
  kitchen: {
    image: 'kitchen.jpg',
    preview: 'kitchen-preview.jpg',
    hotspots: {
      stair2: {
        pitch: 0,
        yaw: 20,
        radius: 0.05,
        distance: 1
      },
      stair0: {
        pitch: 0,
        yaw: 340,
        radius: 0.05,
        distance: 1
      },
      livingroom: {
        pitch: 0,
        yaw: 320,
        radius: 0.05,
        distance: 1
      }
    }
  }
};

function onLoad() {
  vrView = new VRView.Player('#vrview', {
    image: 'blank.png',
    preview: 'blank.png',
    is_stereo: false,
    is_autopan_off: true
  });

  vrView.on('ready', onVRViewReady);
  vrView.on('modechange', onModeChange);
  vrView.on('click', onHotspotClick);
  vrView.on('error', onVRViewError);
}

function onVRViewReady(e) {
  console.log('onVRViewReady');
  loadScene('livingroom');
}

function onModeChange(e) {
  console.log('onModeChange', e.mode);
}

function onHotspotClick(e) {
  console.log('onHotspotClick', e.id);
  if (e.id) {
    loadScene(e.id);
  }
};

function loadScene(id) {
  console.log('loadScene', id);

  // Set the image
  vrView.setContent({
    image: scenes[id].image,
    preview: scenes[id].preview,
    is_stereo: false,
    is_autopan_off: true
  });

  // Add all the hotspots for the scene
  var newScene = scenes[id];
  var sceneHotspots = Object.keys(newScene.hotspots);
  for (var i = 0; i < sceneHotspots.length; i++) {
    var hotspotKey = sceneHotspots[i];
    var hotspot = newScene.hotspots[hotspotKey];

    vrView.addHotspot(hotspotKey, {
      pitch: hotspot.pitch,
      yaw: hotspot.yaw,
      radius: hotspot.radius,
      distance: hotspot.distance
    });
  }
}

function onVRViewError(e) {
  console.log('Error! %s', e.message);
}

window.addEventListener('load', onLoad);
