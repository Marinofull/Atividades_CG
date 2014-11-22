precision mediump float;
	
uniform sampler2D uSampler;

varying vec2 vTextureCoord;
    
void main(void) {	
	vec4 component= texture2D(uSampler, vTextureCoord);
            
            component.r = (component.r + component.g + component.b)/3.0;
            
            if(component.r > 0.5){
                component.r = 1.0;
            }else{
                component.r = 0.0;
            }

            gl_FragColor = vec4(component.r, component.r, component.r, 1.0);
	}