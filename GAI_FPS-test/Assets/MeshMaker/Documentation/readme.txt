MeshMaker - The Modeling Collection.
v1.8.0 - Released 03/09/2014 by Alan Baylis
----------------------------------------


Foreword
----------------------------------------
Thank you for your purchase of MeshMaker. This package contains a collection of eight utilities for creating and working with meshes within Unity.

Geom - Quick and easy geometric modeling
Mesh Editor - Advanced mesh editing utility
Isosurface - Mathematics inspired meshes
Boolean Ops - Perform CSG operations on meshes
MeshPainter - Paint directly on meshes
Blenderizer - Object focused editor camera
Metaballs - Create new organic base meshes
Mesh Tools - Eleven editing tools in one


Notes
----------------------------------------
The first thing to do is drag the folder named 'Editor Default Resources' from the main folder and drag it to the root of the Assets folder in your project. This will add a small icon next to the title on the tab for the window the next time Unity starts.

The main menu now pops up on the scene view window and hides itself in the bottom left corner when not in use. To show the menu simply place the mouse over the visible title.

You can open up all of the programs at the same time and use them in combination, though this has not been thoroughly tested in all cases. If you have any problems, such as the Undo/Redo feature of Mesh Editor not working properly, try restarting Mesh Maker or Unity to see if that fixes the problem.
  
Geom:
Duplicates of grids made in the hierarchy will not be automatically added to Mesh Maker.
Don't delete the Framework or the Grids from the hierarchy, use MeshMaker to delete grids or use the Exit button to end the build session.
Renaming the Grids in the hierarchy will not change their names within Mesh Maker.
256 is the maximum number of control points that you can start with.

MeshEditor:
If you are experiencing problems selecting vertices/triangles you can now change the epsilon value by going into edit mode and pressing the divide and multiply keys on the keypad.

Metaballs:
This is an early version of the program and is suitable for working with up to a dozen or so quality metaballs but more if you work in a lower resolution. Ideal for creating a base mesh that can be tweaked with the Mesh Editor program.

Boolean Ops:
It is not recommended to do more that a few operations on the same target object or the geometry may become corrupted. While the program works well on simple objects it may fail on very complicated objects or objects with underlying problems like holes in their geometry. It is highly recommended that you make a copy of the target object and save your scene before using this software.

To-do List
----------------------------------------
Geom:
Done - Improved normal smoothing.
Done - More CPU friendly.
Done - Mesh Tools work with submeshes. 
Export to FBX.
Spline based frameworks.

MeshEditor:
Done - Extrusion and deformation of meshes.
Edge loops.
Split with plane, with fill option.

MeshPainter:
Done - Direct painting of meshes in Scene View window.
UV unwrapping and editing window.
Better painting across triangle edges.
Different brushes.
Fill option.

Boolean Ops:
Mesh optimization to remove excess triangles after each operation.
Option to group triangles that share the same materials.
Recalculate bounding boxes and other obvious fixes.

MeshTools:
Done - More advanced UV Mapping.

Metaballs:
Option to use different formulas for calculating the metaball fields.
Finite support formula.
Auto resizing of the dimensions.
Process only the cubes around the mesh surface and other optimizations.


Common Issues / FAQ
----------------------------------------
Please visit the home page at http://www.meshmaker.com for the latest news and help forum.


Attributions
----------------------------------------
Boolean Ops uses parts of the open source software created by Evan Wallace and released under the MIT license. To get the original source code and license details follow the links below. 
Direct port of https://github.com/timknip/csg.as (Actionscript 3) to C# / Unity.
Copyright (c) 2011 Evan Wallace (http://madebyevan.com/), under the MIT license (original Javascript version, https://github.com/evanw/csg.js/)
Copyright (c) 2012 Tim Knip (http://floorplanner.com/), under the MIT license (AS3 port, https://github.com/evanw/csg.js/)
Copyright (c) 2013 Andrew Perry (http://omgwtfgames.com), under MIT license (C#/Unity port here at https://github.com/omgwtfgames/csg.cs)

Mesh Editor uses a cut down version of the undo/redo framework written by Nims72. Very nice code and highly recommended. (https://github.com/Nims72/Unity-Custom-Undo-Redo-System)

The textures used in the videos were made By Dexsoft Games and are available for free on the Asset Store. (http://www.assetstore.unity3d.com/en/#!/content/1809)


Contact
----------------------------------------
Alan Baylis
www.meshmaker.com
support@meshmaker.com


Update Log
-----------------------------------------
v1.0.0 released 20/09/13
First release of MeshMaker. 

v1.0.1 released 5/10/13
Improved smoothing of normals.
More CPU friendly.

v1.2.0 released 6/01/14
New feature for creating meshes using the marching cubes algorithm and isosurfaces.
New Isosurface tutorial.
Added option to create inverted meshes.
Single grid meshes are now possible, ideal for billboards and decals.
User defined maximum smooth angle.
Texture planar mapping is now possible from three directions.
Included 60 primitive meshes and 17 frameworks.

v1.3.0 released 26/01/14 
A new toolkit called Mesh Tools has been added with the following features:
Clone Meshes
Move/Rotate Pivot Point
Uniform Scaling
Snap To Grid
Invert Meshes
Flip Meshes

v1.4.0 released 26/02/14
A new texturing utility called MeshPainter has been added.
New MeshPainter tutorial.
Added support for meshes with submeshes to Mesh Tools.
New GUI look.
Source moved to Editor folder to allow test builds.

v1.5.0 released 15/05/14
MeshPainter now paints directly on objects in the Scene View window.
Fixed a bug in Mesh Tools related to Snap To Grid timing out after about 10 minutes.
Box Projection UV mapping now labeled correctly in MeshMaker.
Restored planar UV mapping in the XY plane. 
Original MeshPainter functionality moved to Mesh Tools.
Mesh Tools now contains 8 utilities including Split Mesh and Transform Textures.

v1.6.0 released 04/06/14
Added Boolean Ops (CSG/BSP operations) to the programs list. 
Cleaned up MeshPainter memory usage.
First release of Blenderizer.

v1.7.0 released 02/08/14
Beta release (v0.7) of Mesh Editor.
Original MeshMaker program is now called Geom.
Integrated Blenderizer into Mesh Editor.
Added feature to Geom to set control point position explicitly.

v1.7.1 released 06/08/14
MeshEditor:
Fixed bug when deleting multiple triangles.
Fixed undo/redo step names
Fixed double undo for delete
Cleaned up more memory leaks.
Added option to change epsilon values.

v1.8.0 released 03/09/14
Beta release (v0.5) release of Metaballs.
Improved main menu which discretely hides itself.
New GUI layout for all windows.
Added three new tools to Mesh Tools. Real Scale, Double Sided Meshes and Save Mesh.
Small fixes here and there.

